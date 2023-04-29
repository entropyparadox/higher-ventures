import { TestingModule } from '@nestjs/testing';
import { createUser } from 'apps/infrastructure/seeders/factory/user.factory';
import { setupTestingModule } from 'apps/infrastructure/testing/helper';

import { UserService } from './user.service';

describe('UserService', () => {
  let testingModule: TestingModule;
  let sut: UserService;

  beforeAll(async (done) => {
    [testingModule, sut] = await setupTestingModule<UserService>(UserService);

    done();
  });

  describe('#_findAll', () => {
    it('유저 리스트를 반환해야함', async (done) => {
      // Given
      const user = await createUser();

      // When
      const users = await sut._findAll({});

      // Then
      expect(users.length).toEqual(1);
      done();
    });
  });

  afterAll(async (done) => {
    await testingModule.close();
    done();
  });
});
