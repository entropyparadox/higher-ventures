import { Module } from '@nestjs/common';
import { DomainModule } from 'apps/domain/domain.module';

import { UserBatchHandler } from './user/user.batch.handler';

@Module({
  imports: [DomainModule],
  controllers: [],
  providers: [UserBatchHandler],
})
export class HandlersModule {}
