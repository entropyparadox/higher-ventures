import { Type } from '@nestjs/common';
import {
  ResourceNotFoundException,
  RuntimeException,
} from 'apps/infrastructure/error';
import { DeepPartial, QueryFailedError, Repository } from 'typeorm';

import { IPaginated, Paginated, PaginateDto } from './pagination';
import { TypeOrmEntity } from './typeorm.entity';

export interface FindAllWithPaginationOptions extends PaginateDto {
  filter?: Record<string, any>;
  where?: Record<string, any> | Array<Record<string, any>>;
  sort?: Record<string, any>;
  relations?: string[];
  userId?: number;
}

export interface FindAllOptions {
  filter?: Record<string, any>;
  where?: Record<string, any> | Array<Record<string, any>>;
  sort?: Record<string, any>;
  relations?: string[];
  userId?: number;
}

export interface FindOneOptions {
  id?: number;
  filter?: Record<string, any>;
  where?: Record<string, any> | Array<Record<string, any>>;
  relations?: string[];
  userId?: number;
}

export interface IBaseCrudService<E, C, U> {
  _findAllWithPagination?(
    options: FindAllWithPaginationOptions,
  ): Promise<IPaginated<E>>;
  _findAll?(options: FindAllOptions): Promise<E[]>;
  _findOne?(options: FindOneOptions): Promise<E>;
  _create?(dto: C, rest?: any): Promise<E>;
  _update?(id: number, dto: U): Promise<E>;
  _remove?(id: number): Promise<void>;
}

export function BaseCrudService<E extends TypeOrmEntity>({
  createDtoClass,
  updateDtoClass,
}: {
  createDtoClass?: Record<string, any>;
  updateDtoClass?: Record<string, any>;
} = {}): Type<
  IBaseCrudService<E, typeof createDtoClass, typeof updateDtoClass>
> {
  class BaseCrudServiceHost
    implements
      IBaseCrudService<E, typeof createDtoClass, typeof updateDtoClass>
  {
    constructor(private readonly repository: Repository<E>) {}

    async _findAllWithPagination(
      options: FindAllWithPaginationOptions,
    ): Promise<IPaginated<E>> {
      const {
        relations,
        filter,
        where,
        sort,
        offset,
        limit,
        page,
        itemsPerPage,
        userId,
      } = options;

      const [items, count] = await this.repository.findAndCount({
        skip: offset,
        take: limit,
        where: where
          ? where
          : {
              ...filter,
              ...(userId && { userId }),
            },
        order: sort as any,
        ...(relations && { relations }),
      });

      return new Paginated(items, count, page, itemsPerPage);
    }

    async _findAll(options: FindAllOptions): Promise<E[]> {
      const { relations, filter, where, sort, userId } = options;
      const items = await this.repository.find({
        where: where
          ? where
          : {
              ...filter,
              ...(userId && { userId }),
            },
        order: sort as any,
        ...(relations && { relations }),
      });

      return items;
    }

    async _findOne(options: FindOneOptions): Promise<E> {
      const { id, relations, filter, where, userId } = options;

      const one = await this.repository.findOne({
        where: where
          ? where
          : {
              ...(id && { id }),
              ...filter,
              ...(userId && { userId }),
            },
        ...(relations && { relations }),
      });

      if (!one) {
        throw new ResourceNotFoundException();
      }

      return one;
    }

    async _create(dto: typeof createDtoClass, rest?: any): Promise<E> {
      try {
        const newEntity = await this.repository.save({
          ...dto,
          ...rest,
        } as DeepPartial<E>);

        return newEntity;
      } catch (err) {
        if (
          err instanceof QueryFailedError &&
          err.driverError.code === 'ER_DUP_ENTRY'
        ) {
          throw new RuntimeException(
            '해당 정보로 이미 생성되어있어 중복생성할 수 없습니다.',
          );
        }

        throw err;
      }
    }

    async _update(id: number, dto: typeof updateDtoClass): Promise<E> {
      const one = await this.repository.findOne({ where: { id } });

      if (!one) {
        throw new ResourceNotFoundException();
      }

      this.repository.merge(one, { ...dto } as DeepPartial<E>);

      await this.repository.save(one as DeepPartial<E>);

      return one;
    }

    async _remove(id: number): Promise<void> {
      const one = await this.repository.findOne({ where: { id } });

      if (!one) {
        throw new ResourceNotFoundException();
      }

      if (one.hasOwnProperty('deletedAt')) {
        await this.repository.softRemove(one as DeepPartial<E>);
      } else {
        await this.repository.delete(one.id);
      }
    }

    // ID로 리소스를 조회하고 반환합니다.
    // 리소스가 존재하지 않을 경우 에러를 발생시킵니다.
    async getOneByIdOrFail(
      id: number,
      params?: { relations?: string[]; errorMessage?: string },
    ): Promise<E> {
      const one = await this.getOneById(id, params?.relations);

      if (!one) {
        throw new ResourceNotFoundException(params?.errorMessage);
      }

      return one;
    }

    // ID로 리소스를 조회하고 반환합니다.
    async getOneById(id: number, relations?: string[]): Promise<E> {
      return this.repository.findOne({
        where: {
          id,
        },
        ...(relations && { relations }),
      });
    }
  }

  if (!createDtoClass) {
    delete BaseCrudServiceHost.prototype._create;
  }

  if (!updateDtoClass) {
    delete BaseCrudServiceHost.prototype._update;
  }

  return BaseCrudServiceHost;
}
