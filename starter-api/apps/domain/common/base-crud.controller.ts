import {
  Body,
  Delete,
  Get,
  Header,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Res,
  Type,
  UsePipes,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import { TypePipe } from 'apps/infrastructure/pipe/type.pipe';
import { ValidationPipe } from 'apps/infrastructure/pipe/validation.pipe';
import * as changeCase from 'change-case';
import { plainToInstance } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import { Response } from 'express';
import * as pluralize from 'pluralize';
import {
  Between,
  ILike,
  In,
  LessThan,
  LessThanOrEqual,
  MoreThan,
  MoreThanOrEqual,
} from 'typeorm';
import * as XLSX from 'xlsx';

import { IBaseCrudService } from './base-crud.service';
import { BasePaginatedDto, PaginateDto } from './pagination';
import { TypeOrmEntity } from './typeorm.entity';

export class FindAllWithPaginationDto extends PaginateDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ name: 'sort', type: String })
  sort?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ name: 'filter', type: String })
  filter?: string;
}

export class FindAllDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ name: 'sort', type: String })
  sort?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ name: 'filter', type: String })
  filter?: string;
}

export class FindOneDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ name: 'filter', type: String })
  filter?: string;
}

export type BaseCrudControllerOptions = {
  entity: Type<any>;
  queryDtoClass?: Type<any>;
  queryOption?: {
    relations?: string[];
    resourceType?: 'collection' | 'document';
    filter?: any;
  };
  createDtoClass?: Type<any>;
  updateDtoClass?: Type<any>;
  useDelete?: boolean;
  resourceName?: string;
  pagination?: boolean;
  nested?: {
    resourceName: string;
    paramName: string;
  };
  exportFile?: {
    fileName: string | (() => string);
    xlsx?: boolean;
  };
};

export function BaseCrudController<E extends TypeOrmEntity>(
  options: BaseCrudControllerOptions,
): any {
  const {
    entity,
    resourceName: _resourceName,
    queryDtoClass,
    queryOption,
    createDtoClass,
    updateDtoClass,
    useDelete,
    pagination = true,
    nested,
    exportFile,
  } = options;
  const resourceName = _resourceName ?? entity.name;
  const resourceNamePascalCase = pluralize.singular(
    changeCase.pascalCase(resourceName),
  );
  const resourceNameParamCasePlural = pluralize.plural(
    changeCase.paramCase(resourceName),
  );
  const resourceNameParamCaseSingular = pluralize.singular(
    changeCase.paramCase(resourceName),
  );

  const nestedResourceNameParamCase = pluralize.plural(
    changeCase.paramCase(nested?.resourceName || ''),
  );
  const nestedParamNameCamelCase = pluralize.singular(
    changeCase.camelCase(nested?.paramName || ''),
  );
  const fileName = exportFile?.fileName
    ? typeof exportFile.fileName === 'function'
      ? exportFile.fileName()
      : exportFile.fileName
    : '';

  class BaseCrudControllerHost {
    constructor(
      readonly service: IBaseCrudService<
        E,
        typeof createDtoClass,
        typeof updateDtoClass
      >,
    ) {}

    /**
     * @example
     * /items
     * /items?page=1&limit=25
     * /items?filter={"$or": [{"name": "john"}, {"name": "joe"}]}
     * /items?filter={"name": "john"}
     * /items?filter={"email": {"ilike": "gmail"}}
     * /items?filter={"date": {"between": ["2022-05-01T15:00:00.000Z", "2022-05-02T15:00:00.000Z"]}}
     * /items?filter={"date": {"gt": "2022-05-02T15:00:00.000Z"}}
     * /items?filter={"date": {"gte": "2022-05-02T15:00:00.000Z"}}
     * /items?filter={"date": {"lt": "2022-05-02T15:00:00.000Z"}}
     * /items?filter={"date": {"lte": "2022-05-02T15:00:00.000Z"}}
     * /items?filter={"id": {"in": [1,2,3]}}
     * /items?filter={"relationItem.id": 1}
     * /items?filter={"relationItem.name": {"ilike": "john"}}
     * /items?sort={"id": "DESC"}
     */
    @Get(resourceNameParamCasePlural)
    @ApiOperation({
      operationId: `findAll${resourceNamePascalCase}WithPagination`,
      summary: '페이지네이션 목록 조회',
    })
    @ApiBearerAuth()
    @ApiOkResponse({
      type: BasePaginatedDto(queryDtoClass, resourceNamePascalCase),
    })
    async findAllWithPagination(
      @Query(TypePipe) query: FindAllWithPaginationDto,
    ): Promise<any> {
      const paginated = await this.service._findAllWithPagination({
        page: query.page,
        itemsPerPage: query.itemsPerPage,
        limit: query.limit,
        offset: query.offset,
        sort: this.parseSort(query.sort),
        where: this.parseFilter(query.filter, {
          ...(queryOption?.filter ?? {}),
        }),
        relations: queryOption?.relations,
      });

      return {
        ...paginated,
        items: plainToInstance(queryDtoClass, paginated.items),
      };
    }

    /**
     * @example
     * /nested/:nestedId/items
     * /nested/:nestedId/items?page=1&limit=25
     * /nested/:nestedId/items?filter={"$or": [{"name": "john"}, {"name": "joe"}]}
     * /nested/:nestedId/items?filter={"name": "john"}
     * /nested/:nestedId/items?filter={"email": {"ilike": "gmail"}
     * /nested/:nestedId/items?filter={"date": {"between": ["2022-05-01T15:00:00.000Z", "2022-05-02T15:00:00.000Z"]}}
     * /nested/:nestedId/items?filter={"date": {"gt": "2022-05-02T15:00:00.000Z"}}
     * /nested/:nestedId/items?filter={"date": {"gte": "2022-05-02T15:00:00.000Z"}}
     * /nested/:nestedId/items?filter={"date": {"lt": "2022-05-02T15:00:00.000Z"}}
     * /nested/:nestedId/items?filter={"date": {"lte": "2022-05-02T15:00:00.000Z"}}
     * /nested/:nestedId/items?filter={"id": {"in": [1,2,3]}}
     * /nested/:nestedId/items?filter={"relationItem.id": 1}
     * /nested/:nestedId/items?filter={"relationItem.name": {"ilike": "john"}}
     * /nested/:nestedId/items?sort={"id": "DESC"}
     */
    @Get(
      `${nestedResourceNameParamCase}/:${nestedParamNameCamelCase}/${resourceNameParamCasePlural}`,
    )
    @ApiOperation({
      operationId: `findAll${resourceNamePascalCase}WithPagination`,
      summary: '페이지네이션 목록 조회',
    })
    @ApiBearerAuth()
    @ApiOkResponse({
      type: BasePaginatedDto(queryDtoClass, resourceNamePascalCase),
    })
    async findAllNestedWithPagination(
      @Query(TypePipe) query: FindAllWithPaginationDto,
      @Param(nestedParamNameCamelCase, ParseIntPipe) nestedParam?: number,
    ): Promise<any> {
      const paginated = await this.service._findAllWithPagination({
        page: query.page,
        itemsPerPage: query.itemsPerPage,
        limit: query.limit,
        offset: query.offset,
        sort: this.parseSort(query.sort),
        where: this.parseFilter(query.filter, {
          ...(queryOption?.filter ?? {}),
          ...(nested && { [nestedParamNameCamelCase]: nestedParam }),
        }),
        relations: queryOption?.relations,
      });

      return {
        ...paginated,
        items: plainToInstance(queryDtoClass, paginated.items),
      };
    }

    /**
     * @example
     * /nested/:nestedId/item
     * /nested/:nestedId/item?filter={"$or": [{"name": "john"}, {"name": "joe"}]}
     * /nested/:nestedId/item?filter={"name": "john"}
     * /nested/:nestedId/item?filter={"email": {"ilike": "gmail"}
     * /nested/:nestedId/item?filter={"date": {"between": ["2022-05-01T15:00:00.000Z", "2022-05-02T15:00:00.000Z"]}}
     * /nested/:nestedId/item?filter={"date": {"gt": "2022-05-02T15:00:00.000Z"}}
     * /nested/:nestedId/item?filter={"date": {"gte": "2022-05-02T15:00:00.000Z"}}
     * /nested/:nestedId/item?filter={"date": {"lt": "2022-05-02T15:00:00.000Z"}}
     * /nested/:nestedId/item?filter={"date": {"lte": "2022-05-02T15:00:00.000Z"}}
     * /nested/:nestedId/item?filter={"id": {"in": [1,2,3]}}
     * /nested/:nestedId/item?filter={"relationItem.id": 1}
     * /nested/:nestedId/item?filter={"relationItem.name": {"ilike": "john"}}
     * /nested/:nestedId/item?sort={"id": "DESC"}
     */
    @Get(
      `${nestedResourceNameParamCase}/:${nestedParamNameCamelCase}/${resourceNameParamCaseSingular}`,
    )
    @ApiOperation({
      operationId: `findOne${resourceNamePascalCase}`,
      summary: '단일 조회',
    })
    @ApiBearerAuth()
    @ApiOkResponse({ type: queryDtoClass })
    async findOneNested(
      @Query(TypePipe) query: FindOneDto,
      @Param(nestedParamNameCamelCase, ParseIntPipe) nestedParam?: number,
    ): Promise<any> {
      const item = await this.service._findOne({
        where: this.parseFilter(query.filter, {
          ...(queryOption?.filter ?? {}),
          ...(nested && { [nestedParamNameCamelCase]: nestedParam }),
        }),
        relations: queryOption?.relations,
      });

      return plainToInstance(queryDtoClass, item);
    }

    /**
     * @example
     * /items
     * /items?filter={"$or": [{"name": "john"}, {"name": "joe"}]}
     * /items?filter={"name": "john"}
     * /items?filter={"email": {"ilike": "gmail"}}
     * /items?filter={"date": {"between": ["2022-05-01T15:00:00.000Z", "2022-05-02T15:00:00.000Z"]}}
     * /items?filter={"date": {"gt": "2022-05-02T15:00:00.000Z"}}
     * /items?filter={"date": {"gte": "2022-05-02T15:00:00.000Z"}}
     * /items?filter={"date": {"lt": "2022-05-02T15:00:00.000Z"}}
     * /items?filter={"date": {"lte": "2022-05-02T15:00:00.000Z"}}
     * /items?filter={"id": {"in": [1,2,3]}}
     * /items?filter={"relationItem.id": 1}
     * /items?filter={"relationItem.name": {"ilike": "john"}}
     * /items?sort={"id": "DESC"}
     */
    @Get(resourceNameParamCasePlural)
    @ApiOperation({
      operationId: `findAll${resourceNamePascalCase}`,
      summary: '전체 목록 조회',
    })
    @ApiBearerAuth()
    @ApiOkResponse({
      type: [queryDtoClass],
    })
    async findAll(@Query(TypePipe) query: FindAllDto): Promise<any> {
      const items = await this.service._findAll({
        sort: this.parseSort(query.sort),
        where: this.parseFilter(query.filter, {
          ...(queryOption?.filter ?? {}),
        }),
        relations: queryOption?.relations,
      });

      return plainToInstance(queryDtoClass, items);
    }

    /**
     * @example
     * /items
     * /items?filter={"$or": [{"name": "john"}, {"name": "joe"}]}
     * /items?filter={"name": "john"}
     * /items?filter={"email": {"ilike": "gmail"}}
     * /items?filter={"date": {"between": ["2022-05-01T15:00:00.000Z", "2022-05-02T15:00:00.000Z"]}}
     * /items?filter={"date": {"gt": "2022-05-02T15:00:00.000Z"}}
     * /items?filter={"date": {"gte": "2022-05-02T15:00:00.000Z"}}
     * /items?filter={"date": {"lt": "2022-05-02T15:00:00.000Z"}}
     * /items?filter={"date": {"lte": "2022-05-02T15:00:00.000Z"}}
     * /items?filter={"id": {"in": [1,2,3]}}
     * /items?filter={"relationItem.id": 1}
     * /items?filter={"relationItem.name": {"ilike": "john"}}
     * /items?sort={"id": "DESC"}
     */
    @Get(`${resourceNameParamCasePlural}/xlsx`)
    @Header(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    )
    @Header(
      'Content-Disposition',
      `attachment; filename=${encodeURI(fileName)}.xlsx`,
    )
    @ApiOperation({
      operationId: `findAll${resourceNamePascalCase}AndExportToExcel`,
      summary: '전체목록 엑셀 내보내기',
    })
    @ApiBearerAuth()
    async findAllAndExportToExcel(
      @Query(TypePipe) query: FindAllDto,
      @Res() res: Response,
    ): Promise<any> {
      const items = await this.service._findAll({
        sort: this.parseSort(query.sort),
        where: this.parseFilter(query.filter, {
          ...(queryOption?.filter ?? {}),
        }),
        relations: queryOption?.relations,
      });

      const exportData = this.convertEntitiesToExportData(items);
      const wb = XLSX.utils.book_new();
      const newWorksheet = XLSX.utils.json_to_sheet(exportData);
      XLSX.utils.book_append_sheet(wb, newWorksheet, 'sheet1');
      const wbOptions = { bookType: 'xlsx' as const, type: 'base64' as const };
      const wbout = XLSX.write(wb, wbOptions);
      res.end(Buffer.from(wbout, 'base64'));
    }

    /**
     * @example
     * /nested/:nestedId/items
     * /nested/:nestedId/items?filter={"$or": [{"name": "john"}, {"name": "joe"}]}
     * /nested/:nestedId/items?filter={"name": "john"}
     * /nested/:nestedId/items?filter={"email": {"ilike": "gmail"}
     * /nested/:nestedId/items?filter={"date": {"between": ["2022-05-01T15:00:00.000Z", "2022-05-02T15:00:00.000Z"]}}
     * /nested/:nestedId/items?filter={"date": {"gt": "2022-05-02T15:00:00.000Z"}}
     * /nested/:nestedId/items?filter={"date": {"gte": "2022-05-02T15:00:00.000Z"}}
     * /nested/:nestedId/items?filter={"date": {"lt": "2022-05-02T15:00:00.000Z"}}
     * /nested/:nestedId/items?filter={"date": {"lte": "2022-05-02T15:00:00.000Z"}}
     * /nested/:nestedId/items?filter={"id": {"in": [1,2,3]}}
     * /nested/:nestedId/items?filter={"relationItem.id": 1}
     * /nested/:nestedId/items?filter={"relationItem.name": {"ilike": "john"}}
     * /nested/:nestedId/items?sort={"id": "DESC"}
     */
    @Get(
      `${nestedResourceNameParamCase}/:${nestedParamNameCamelCase}/${resourceNameParamCasePlural}`,
    )
    @ApiOperation({
      operationId: `findAll${resourceNamePascalCase}`,
      summary: '전체 목록 조회',
    })
    @ApiBearerAuth()
    @ApiOkResponse({
      type: [queryDtoClass],
    })
    async findAllNested(
      @Query(TypePipe) query: FindAllDto,
      @Param(nestedParamNameCamelCase, ParseIntPipe) nestedParam: number,
    ): Promise<any> {
      const items = await this.service._findAll({
        sort: this.parseSort(query.sort),
        where: this.parseFilter(query.filter, {
          ...(queryOption?.filter ?? {}),
          ...(nested && { [nestedParamNameCamelCase]: nestedParam }),
        }),
        relations: queryOption?.relations,
      });

      return plainToInstance(queryDtoClass, items);
    }

    /**
     * @example
     * /nested/:nestedId/items
     * /nested/:nestedId/items?filter={"$or": [{"name": "john"}, {"name": "joe"}]}
     * /nested/:nestedId/items?filter={"name": "john"}
     * /nested/:nestedId/items?filter={"email": {"ilike": "gmail"}
     * /nested/:nestedId/items?filter={"date": {"between": ["2022-05-01T15:00:00.000Z", "2022-05-02T15:00:00.000Z"]}}
     * /nested/:nestedId/items?filter={"date": {"gt": "2022-05-02T15:00:00.000Z"}}
     * /nested/:nestedId/items?filter={"date": {"gte": "2022-05-02T15:00:00.000Z"}}
     * /nested/:nestedId/items?filter={"date": {"lt": "2022-05-02T15:00:00.000Z"}}
     * /nested/:nestedId/items?filter={"date": {"lte": "2022-05-02T15:00:00.000Z"}}
     * /nested/:nestedId/items?filter={"id": {"in": [1,2,3]}}
     * /nested/:nestedId/items?filter={"relationItem.id": 1}
     * /nested/:nestedId/items?filter={"relationItem.name": {"ilike": "john"}}
     * /nested/:nestedId/items?sort={"id": "DESC"}
     */
    @Get(
      `${nestedResourceNameParamCase}/:${nestedParamNameCamelCase}/${resourceNameParamCasePlural}/xlsx`,
    )
    @Header(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    )
    @Header(
      'Content-Disposition',
      `attachment; filename=${encodeURI(fileName)}.xlsx`,
    )
    @ApiOperation({
      operationId: `findAll${resourceNamePascalCase}AndExportToExcel`,
      summary: '전체목록 엑셀 내보내기',
    })
    @ApiBearerAuth()
    async findAllNestedAndExportToExcel(
      @Query(TypePipe) query: FindAllDto,
      @Param(nestedParamNameCamelCase, ParseIntPipe) nestedParam: number,
      @Res() res: Response,
    ): Promise<any> {
      const items = await this.service._findAll({
        sort: this.parseSort(query.sort),
        where: this.parseFilter(query.filter, {
          ...(queryOption?.filter ?? {}),
          ...(nested && { [nestedParamNameCamelCase]: nestedParam }),
        }),
        relations: queryOption?.relations,
      });

      const exportData = this.convertEntitiesToExportData(items);
      const wb = XLSX.utils.book_new();
      const newWorksheet = XLSX.utils.json_to_sheet(exportData);
      XLSX.utils.book_append_sheet(wb, newWorksheet, 'sheet1');
      const wbOptions = { bookType: 'xlsx' as const, type: 'base64' as const };
      const wbout = XLSX.write(wb, wbOptions);
      res.end(Buffer.from(wbout, 'base64'));
    }

    /**
     * @example
     * /items/1
     * /items/1?filter={"$or": [{"name": "john"}, {"name": "joe"}]}
     * /items/1?filter={"name": "john"}
     * /items/1?filter={"email": {"ilike": "gmail"}}
     * /items/1?filter={"date": {"between": ["2022-05-01T15:00:00.000Z", "2022-05-02T15:00:00.000Z"]}}
     * /items/1?filter={"date": {"gt": "2022-05-02T15:00:00.000Z"}}
     * /items/1?filter={"date": {"gte": "2022-05-02T15:00:00.000Z"}}
     * /items/1?filter={"date": {"lt": "2022-05-02T15:00:00.000Z"}}
     * /items/1?filter={"date": {"lte": "2022-05-02T15:00:00.000Z"}}
     * /items/1?filter={"id": {"in": [1,2,3]}}
     * /items/1?filter={"relationItem.id": 1}
     * /items/1?filter={"relationItem.name": {"ilike": "john"}}
     */
    @Get(`${resourceNameParamCasePlural}/:id`)
    @ApiOperation({
      operationId: `findOne${resourceNamePascalCase}ById`,
      summary: 'ID로 단일 조회',
    })
    @ApiBearerAuth()
    @ApiOkResponse({ type: queryDtoClass })
    async findById(
      @Query(TypePipe) query: FindOneDto,
      @Param('id', ParseIntPipe) id: number,
    ): Promise<any> {
      const item = await this.service._findOne({
        where: this.parseFilter(query.filter, {
          ...(queryOption?.filter ?? {}),
          id,
        }),
        relations: queryOption?.relations,
      });
      return plainToInstance(queryDtoClass, item);
    }

    /**
     * @example
     * POST /items
     */
    @Post(resourceNameParamCasePlural)
    @ApiOperation({
      operationId: `create${resourceNamePascalCase}`,
      summary: '생성',
    })
    @ApiBearerAuth()
    @ApiBody({ type: createDtoClass })
    @ApiCreatedResponse({ type: queryDtoClass ? queryDtoClass : null })
    @UsePipes(new ValidationPipe({ body: createDtoClass }))
    async create(@Body() dto: typeof createDtoClass): Promise<any> {
      const newEntity = await this.service._create(dto);
      const item = await this.service._findOne({
        id: newEntity.id,
        relations: queryOption?.relations,
      });

      if (queryDtoClass) {
        return plainToInstance(queryDtoClass, item);
      }
    }

    /**
     * @example
     * POST /nested/:nestedId/items
     */
    @Post(
      `${nestedResourceNameParamCase}/:${nestedParamNameCamelCase}/${resourceNameParamCasePlural}`,
    )
    @ApiOperation({
      operationId: `create${resourceNamePascalCase}`,
      summary: '생성',
    })
    @ApiBearerAuth()
    @ApiBody({ type: createDtoClass })
    @ApiCreatedResponse({ type: queryDtoClass ? queryDtoClass : null })
    @UsePipes(new ValidationPipe({ body: createDtoClass }))
    async createNested(
      @Body() dto: typeof createDtoClass,
      @Param(nestedParamNameCamelCase, ParseIntPipe) nestedParam: number,
    ): Promise<any> {
      const newEntity = await this.service._create(dto, {
        [nestedParamNameCamelCase]: nestedParam,
      });
      const item = await this.service._findOne({
        id: newEntity.id,
        relations: queryOption?.relations,
      });

      if (queryDtoClass) {
        return plainToInstance(queryDtoClass, item);
      }
    }

    /**
     * @example
     * PATCH /items/1
     */
    @Patch(`${resourceNameParamCasePlural}/:id`)
    @ApiOperation({
      operationId: `update${resourceNamePascalCase}`,
      summary: '수정',
    })
    @ApiBearerAuth()
    @ApiBody({ type: updateDtoClass })
    @ApiOkResponse({ type: queryDtoClass ? queryDtoClass : null })
    @UsePipes(new ValidationPipe({ body: updateDtoClass }))
    async update(
      @Param('id', ParseIntPipe) id: number,
      @Body() dto: typeof updateDtoClass,
    ): Promise<any> {
      const updatedEntity = await this.service._update(id, dto);
      const item = await this.service._findOne({
        id: updatedEntity.id,
        relations: queryOption?.relations,
      });

      if (queryDtoClass) {
        return plainToInstance(queryDtoClass, item);
      }
    }

    /**
     * @example
     * DELETE /items/1
     */
    @Delete(`${resourceNameParamCasePlural}/:id`)
    @ApiOperation({
      operationId: `remove${resourceNamePascalCase}`,
      summary: '삭제',
    })
    @ApiBearerAuth()
    async remove(@Param('id', ParseIntPipe) id: number) {
      await this.service._remove(id);
    }

    protected convertEntitiesToExportData(entities: E[]) {
      return entities;
    }

    private parseFilter(filter?: any, defaultFilter?: any) {
      if (!filter) return { ...defaultFilter };

      try {
        const filterObj =
          typeof filter === 'string' ? JSON.parse(filter) : filter;

        const entriesFilter = Object.entries<any>(filterObj).reduce(
          (where, [key, value]) => {
            const relations = key.split('.');

            if (relations.length >= 2) {
              const parentKey = relations.shift();
              where[parentKey] = this.parseFilter(
                JSON.stringify({
                  [relations.join('.')]: value,
                }),
              );
            } else if (key === '$or') {
            } else if (Array.isArray(value)) {
              where[key] = In(value);
            } else if (value.hasOwnProperty('ilike')) {
              where[key] = ILike(`%${value.ilike}%`);
            } else if (value.hasOwnProperty('between')) {
              const [from, to] = value.between;
              where[key] = Between(from, to);
            } else if (value.hasOwnProperty('in')) {
              where[key] = In(value.in);
            } else if (value.hasOwnProperty('gt')) {
              where[key] = MoreThan(value.gt);
            } else if (value.hasOwnProperty('gte')) {
              where[key] = MoreThanOrEqual(value.gte);
            } else if (value.hasOwnProperty('lt')) {
              where[key] = LessThan(value.lt);
            } else if (value.hasOwnProperty('lte')) {
              where[key] = LessThanOrEqual(value.lte);
            } else {
              where[key] = value;
            }
            return where;
          },
          {} as any,
        );

        if (filterObj.hasOwnProperty('$or')) {
          const convertArrayToObject = filterObj['$or'].reduce((obj, item) => {
            const key = Object.keys(item)[0];
            obj[key] = item[key];
            return obj;
          }, {});

          const parseOrFilter = this.parseFilter(convertArrayToObject);
          const result = Object.keys(parseOrFilter).map((key) => ({
            [key]: parseOrFilter[key],
            ...entriesFilter,
            ...defaultFilter,
          }));

          return result;
        }

        return {
          ...entriesFilter,
          ...defaultFilter,
        };
      } catch (err) {
        return {};
      }
    }

    private parseSort(sort?: string) {
      if (!sort) return {};

      try {
        return JSON.parse(sort);
      } catch (err) {
        return {};
      }
    }
  }

  if (!queryDtoClass) {
    delete BaseCrudControllerHost.prototype.findAll;
    delete BaseCrudControllerHost.prototype.findAllAndExportToExcel;
    delete BaseCrudControllerHost.prototype.findAllNested;
    delete BaseCrudControllerHost.prototype.findAllNestedAndExportToExcel;
    delete BaseCrudControllerHost.prototype.findAllWithPagination;
    delete BaseCrudControllerHost.prototype.findAllNestedWithPagination;
    delete BaseCrudControllerHost.prototype.findById;
  }

  if (!createDtoClass) {
    delete BaseCrudControllerHost.prototype.create;
    delete BaseCrudControllerHost.prototype.createNested;
  }

  if (!updateDtoClass) {
    delete BaseCrudControllerHost.prototype.update;
  }

  if (!useDelete) {
    delete BaseCrudControllerHost.prototype.remove;
  }

  if (pagination) {
    delete BaseCrudControllerHost.prototype.findAll;
    delete BaseCrudControllerHost.prototype.findAllNested;
  } else {
    delete BaseCrudControllerHost.prototype.findAllWithPagination;
    delete BaseCrudControllerHost.prototype.findAllNestedWithPagination;
  }

  if (nested) {
    delete BaseCrudControllerHost.prototype.findAllWithPagination;
    delete BaseCrudControllerHost.prototype.findAll;
    delete BaseCrudControllerHost.prototype.findAllAndExportToExcel;
    delete BaseCrudControllerHost.prototype.create;

    if (queryOption?.resourceType === 'document') {
      delete BaseCrudControllerHost.prototype.findAllNestedWithPagination;
      delete BaseCrudControllerHost.prototype.findAllNested;
      delete BaseCrudControllerHost.prototype.findAllNestedAndExportToExcel;
    } else {
      delete BaseCrudControllerHost.prototype.findOneNested;
    }
  } else {
    delete BaseCrudControllerHost.prototype.findAllNestedWithPagination;
    delete BaseCrudControllerHost.prototype.findAllNested;
    delete BaseCrudControllerHost.prototype.findAllNestedAndExportToExcel;
    delete BaseCrudControllerHost.prototype.findOneNested;
    delete BaseCrudControllerHost.prototype.createNested;
  }

  if (!exportFile || !exportFile.xlsx) {
    delete BaseCrudControllerHost.prototype.findAllAndExportToExcel;
    delete BaseCrudControllerHost.prototype.findAllNestedAndExportToExcel;
  }

  Reflect.defineMetadata(
    'swagger/apiUseTags',
    [resourceNameParamCasePlural],
    BaseCrudControllerHost,
  );

  return BaseCrudControllerHost;
}
