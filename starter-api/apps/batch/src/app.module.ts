import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { DomainModule } from 'apps/domain/domain.module';
import { InfrastructureModule } from 'apps/infrastructure/infrastructure.module';
import { envValidationSchema } from 'env.config';

import { HandlersModule } from './handlers.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envValidationSchema,
    }),
    HandlersModule,
    DomainModule,
    InfrastructureModule.forRoot(),
  ],
  providers: [],
})
export class AppModule {}
