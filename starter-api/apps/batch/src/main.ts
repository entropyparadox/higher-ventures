import { NestFactory } from '@nestjs/core';
import { ApplicationLogger } from 'apps/infrastructure/logger/application.logger';
import { TypePipe } from 'apps/infrastructure/pipe/type.pipe';
import { ValidationPipe } from 'apps/infrastructure/pipe/validation.pipe';
import * as moment from 'moment-timezone';

import { AppModule } from './app.module';

async function bootstrap() {
  moment.tz.setDefault('Asia/Seoul');
  const app = await NestFactory.create(AppModule);
  app.useLogger(new ApplicationLogger());
  app.useGlobalPipes(new ValidationPipe(), new TypePipe());
  await app.listen(process.env.BATCH_PORT || 8002);
}
bootstrap();
