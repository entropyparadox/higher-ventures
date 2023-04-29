import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthFailedException } from 'apps/infrastructure/error';
import { compare } from 'bcryptjs';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';

import { Role } from '../common/enum';
import { User } from '../user/user.entity';
import { LoginResultDto } from './dto/login-result.dto';
import { LoginWithEmailDto } from './dto/login-with-email.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  // 유저 이메일, 비밀번호로 인증 및 토큰발급
  async loginUserWithEmail(dto: LoginWithEmailDto): Promise<LoginResultDto> {
    const user = await this.authWithEmail(dto.email, dto.password);

    return plainToInstance(LoginResultDto, {
      token: await this.generateAccessToken(user.id, user.role),
      role: user.role,
    });
  }

  // 유저id로 인증 및 토큰 발급
  async loginUserWithId(userId: number): Promise<LoginResultDto> {
    const user = await this.authWithId(userId);

    return plainToInstance(LoginResultDto, {
      token: await this.generateAccessToken(user.id, user.role),
      role: user.role,
    });
  }

  // 관리자 유저 이메일, 비밀번호로 인증 및 토큰발급
  async loginAdminWithEmail(dto: LoginWithEmailDto): Promise<LoginResultDto> {
    const user = await this.authWithEmail(dto.email, dto.password, Role.ADMIN);

    return plainToInstance(LoginResultDto, {
      token: await this.generateAccessToken(user.id, user.role),
      role: user.role,
    });
  }

  // 유저 ID로 인증
  async authWithId(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ id });

    if (!user) {
      throw new AuthFailedException();
    }

    return user;
  }

  // 이메일, 비밀번호로 인증
  async authWithEmail(
    email: string,
    password: string,
    role?: Role,
  ): Promise<User> {
    const user = await this.userRepository.findOne({ email });

    if (!user || (role && user.role !== role)) {
      throw new AuthFailedException();
    }

    const isAuthenticated = await compare(password, user.password);

    if (isAuthenticated) {
      return user;
    }

    throw new AuthFailedException();
  }

  // JWT 액세스 토큰 생성
  async generateAccessToken(userId: number, role: Role) {
    const payload = { sub: userId, role };
    return this.jwtService.sign(payload);
  }
}
