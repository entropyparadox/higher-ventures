import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RuntimeException } from 'apps/infrastructure/error';
import { hashSync } from 'bcryptjs';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional-cls-hooked';

import { BaseCrudService } from '../common/base-crud.service';
import { SignUpDto } from './dto/sign-up.dto';
import { User } from './user.entity';

@Injectable()
export class UserService extends BaseCrudService<User>() {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super(userRepository);
  }

  // 회원가입
  @Transactional()
  async signUp(dto: SignUpDto): Promise<User> {
    const isDuplicatedEmail = !!(await this.userRepository.findOne({
      email: dto.email,
    }));

    if (isDuplicatedEmail) {
      throw new RuntimeException('이미 가입된 이메일입니다.');
    }

    const user = new User();
    user.name = dto.name;
    user.email = dto.email;
    user.password = hashSync(dto.password);
    await this.userRepository.save(user);

    return user;
  }
}
