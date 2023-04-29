import { Role } from 'apps/domain/common/enum';
import { Factory, Seeder } from 'typeorm-seeding';

import { createUser, createUsers } from '../factory/user.factory';

export default class CreateDevSeed implements Seeder {
  public async run(factory: Factory): Promise<any> {
    await createUsers({ role: Role.USER }, 10);
    await createUser({
      role: Role.USER,
      email: 'user@gmail.com',
      password: 'asdfasdf',
    });
    await createUser({
      role: Role.ADMIN,
      email: 'admin@gmail.com',
      password: 'asdfasdf',
    });
  }
}
