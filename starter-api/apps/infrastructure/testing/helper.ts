import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { DomainModule } from 'apps/domain/domain.module';
import { InfrastructureModule } from 'apps/infrastructure/infrastructure.module';
import { envValidationSchema } from 'env.config';

export async function setupTestingModule<T>(
  serviceClass?: any,
): Promise<[TestingModule, T?]> {
  const testingModule = await Test.createTestingModule({
    imports: [
      ConfigModule.forRoot({
        isGlobal: true,
        validationSchema: envValidationSchema,
      }),
      InfrastructureModule.forRoot(),
      DomainModule,
    ],
    providers: [],
  }).compile();

  if (!serviceClass) {
    return [testingModule];
  }

  const service = await testingModule.resolve<T>(serviceClass);

  return [testingModule, service];
}
