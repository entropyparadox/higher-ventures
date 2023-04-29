import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { DomainModule } from 'apps/domain/domain.module';

import { AuthController } from './auth/auth.controller';
import { FileController } from './file/file.controller';
import { HealthController } from './health/health.controller';
import { UserController } from './user/user.controller';

@Module({
  imports: [DomainModule, TerminusModule],
  controllers: [
    HealthController,
    AuthController,
    UserController,
    FileController,
  ],
})
export class ControllerModule {}
