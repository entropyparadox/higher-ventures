import { DynamicModule, Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'apps/domain/user/user.entity';
import {
  initializeTransactionalContext,
  patchTypeORMRepositoryWithBaseRepository,
} from 'typeorm-transactional-cls-hooked';

import { AwsService } from './clients/aws/aws.service';
import { ApplicationLogger } from './logger/application.logger';

const entities = [User];

/*
// 사용가능한 외부서비스 클라이언트
const clients = [
  AppleService,
  NhnCloudService, 
  KakaoService,
  AwsService,
  BootpayService,
  NicePayService,
  TeamFreshService,
  IamportService,
];
*/
const clients = [AwsService];

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        const config =
          process.env.NODE_ENV === 'test'
            ? {
                host: process.env.TEST_DB_HOST,
                port: Number(process.env.TEST_DB_PORT),
                username: process.env.TEST_DB_USERNAME,
                password: process.env.TEST_DB_PASSWORD,
                database: process.env.TEST_DB_DATABASE,
                // 테스트코드 실행 중 clearDB 하는 과정에서
                // 2개 이상의 커넥션이 생성되는 것을 막기 위해
                // 커넥션 제한
                extra: {
                  connectionLimit: 1,
                },
              }
            : {
                host: process.env.DB_HOST,
                port: Number(process.env.DB_PORT),
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_DATABASE,
              };

        return {
          type: 'mysql',
          ...config,
          extra: {
            ...config.extra,
            decimalNumbers: true,
          },
          autoLoadEntities: true,
          synchronize:
            process.env.SYNC === 'true' && process.env.NODE_ENV !== 'test',
          dropSchema: false,
          timezone: 'Z',
        };
      },
    }),
    TypeOrmModule.forFeature(entities),
  ],
  providers: [...clients, ApplicationLogger],
  exports: [TypeOrmModule, ...clients, ApplicationLogger],
})
export class InfrastructureModule {
  public static forRoot(): DynamicModule {
    initializeTransactionalContext();
    patchTypeORMRepositoryWithBaseRepository();

    return {
      module: InfrastructureModule,
    };
  }
}
