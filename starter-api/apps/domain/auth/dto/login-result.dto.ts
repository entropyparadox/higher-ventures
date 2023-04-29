import { Role } from 'apps/domain/common/enum';
import { EnumType } from 'apps/domain/common/enum-type.decorator';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class LoginResultDto {
  @Expose()
  token: string;

  @Expose()
  @EnumType(Role, 'Role')
  role: Role;
}
