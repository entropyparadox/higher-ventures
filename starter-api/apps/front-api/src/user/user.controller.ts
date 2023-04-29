import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthService } from 'apps/domain/auth/auth.service';
import { LoginResultDto } from 'apps/domain/auth/dto/login-result.dto';
import { SignUpDto } from 'apps/domain/user/dto/sign-up.dto';
import { UserMeDto } from 'apps/domain/user/dto/user-me.dto';
import { User } from 'apps/domain/user/user.entity';
import { UserService } from 'apps/domain/user/user.service';
import { CurrentUser } from 'apps/infrastructure/auth/current-user.decorator';
import { Public } from 'apps/infrastructure/auth/public.decorator';
import { plainToInstance } from 'class-transformer';

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({
    operationId: 'findMe',
    summary: '내 정보 조회',
    tags: ['users'],
  })
  @ApiBearerAuth()
  @Get('/users/me')
  async findMe(@CurrentUser() user: User): Promise<UserMeDto> {
    return plainToInstance(UserMeDto, user);
  }

  @ApiOperation({
    operationId: 'signUp',
    summary: '회원가입',
    tags: ['users'],
  })
  @Public()
  @Post('/users/signup')
  async signup(@Body() dto: SignUpDto): Promise<LoginResultDto> {
    const user = await this.userService.signUp(dto);
    return this.authService.loginUserWithId(user.id);
  }
}
