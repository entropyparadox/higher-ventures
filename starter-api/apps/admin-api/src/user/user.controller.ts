import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { BaseCrudController } from 'apps/domain/common/base-crud.controller';
import { Role } from 'apps/domain/common/enum';
import { UserDto } from 'apps/domain/user/dto/user.dto';
import { UserMeDto } from 'apps/domain/user/dto/user-me.dto';
import { User } from 'apps/domain/user/user.entity';
import { UserService } from 'apps/domain/user/user.service';
import { CurrentUser } from 'apps/infrastructure/auth/current-user.decorator';
import { Roles } from 'apps/infrastructure/auth/roles.decorator';
import { plainToInstance } from 'class-transformer';

@Roles(Role.ADMIN)
@Controller()
export class UserController extends BaseCrudController<User>({
  entity: User,
  queryDtoClass: UserDto,
}) {
  constructor(private readonly userService: UserService) {
    super(userService);
  }

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
}
