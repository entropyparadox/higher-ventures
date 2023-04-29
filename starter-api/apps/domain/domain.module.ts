import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth/auth.service';
import { FileService } from './file/file.service';
import { UserService } from './user/user.service';

const services = [AuthService, UserService, FileService];

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({ secret: process.env.JWT_SECRET }),
    }),
  ],
  providers: [...services],
  exports: [...services],
})
export class DomainModule {}
