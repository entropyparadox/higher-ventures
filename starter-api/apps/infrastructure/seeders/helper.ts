import { getRepository } from 'typeorm';
import { factory } from 'typeorm-seeding';

export function createOneFactory<T>(entityClass: any) {
  return async (context?: Partial<T>): Promise<T> => {
    const entity = (await factory(entityClass)(context).make()) as T;
    return getRepository(entityClass).save(entity);
  };
}

export function createManyFactory<T>(entityClass: any) {
  return async (context?: Partial<T>, count = 1): Promise<T[]> => {
    const entity = (await factory(entityClass)(context).makeMany(count)) as T[];
    return getRepository(entityClass).save(entity);
  };
}
