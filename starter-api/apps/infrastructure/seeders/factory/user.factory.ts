import { Faker } from '@faker-js/faker';
import { Role } from 'apps/domain/common/enum';
import { User } from 'apps/domain/user/user.entity';
import { hashSync } from 'bcryptjs';
import { define } from 'typeorm-seeding';

import { createManyFactory, createOneFactory } from '../helper';

define(User, (faker: Faker, context?: Partial<User>) => {
  const user = new User();
  user.email = context?.email ?? `user${+new Date()}@gmail.com`;
  user.password = hashSync(context?.password ?? 'password');
  user.name = context?.name ?? faker.name.firstName();
  user.role = context?.role ?? Role.USER;
  return user;
});

export const createUser = createOneFactory<User>(User);
export const createUsers = createManyFactory<User>(User);
