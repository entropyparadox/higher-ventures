import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AuthService } from 'apps/domain/auth/auth.service';
import { LoginResultDto } from 'apps/domain/auth/dto/login-result.dto';
import { LoginWithEmailDto } from 'apps/domain/auth/dto/login-with-email.dto';
import { Public } from 'apps/infrastructure/auth/public.decorator';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    operationId: 'loginByEmail',
    summary: '로그인',
    tags: ['auth'],
  })
  @Public()
  @Post('/auth/login')
  async loginByEmail(@Body() dto: LoginWithEmailDto): Promise<LoginResultDto> {
    return this.authService.loginUserWithEmail(dto);
  }
}
