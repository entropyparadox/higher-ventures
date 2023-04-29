import { PickType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

import { UserDto } from './user.dto';

@Exclude()
export class UserMeDto extends PickType(UserDto, [
  'id',
  'email',
  'name',
  'role',
]) {}
