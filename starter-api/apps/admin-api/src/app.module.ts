import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';
import { ThrottlerModule } from '@nestjs/throttler';
import { JwtStrategy } from 'apps/domain/auth/jwt.strategy';
import { RoleStrategy } from 'apps/domain/auth/role.strategy';
import { DomainModule } from 'apps/domain/domain.module';
import { JwtAuthGuard } from 'apps/infrastructure/auth/jwt-auth.guard';
import { RolesGuard } from 'apps/infrastructure/auth/roles.guard';
import { HttpExceptionFilter } from 'apps/infrastructure/error/exception.filter';
import { InfrastructureModule } from 'apps/infrastructure/infrastructure.module';
import { HttpLoggerMiddleware } from 'apps/infrastructure/logger/http-logger.middleware';
import { TypePipe } from 'apps/infrastructure/pipe/type.pipe';
import { envValidationSchema } from 'env.config';

import { ControllerModule } from './controller.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envValidationSchema,
    }),
    PassportModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 5000,
    }),
    ControllerModule,
    DomainModule,
    InfrastructureModule.forRoot(),
  ],
  providers: [
    HttpLoggerMiddleware,
    JwtStrategy,
    RoleStrategy,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    TypePipe,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
