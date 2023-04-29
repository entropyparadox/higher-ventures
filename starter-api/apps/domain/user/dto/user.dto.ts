import { Role } from 'apps/domain/common/enum';
import { EnumType } from 'apps/domain/common/enum-type.decorator';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  name: string;

  @Expose()
  @EnumType(Role, 'Role')
  role: Role;
}
