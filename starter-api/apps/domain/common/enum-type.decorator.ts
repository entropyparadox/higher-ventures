import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

/*
 *  Request, Response DTO에 enum 프로퍼티를 정의할 때 사용
 *
 *  DTO 파일을 generate 할 때 enumName을 이름으로 갖는 별도의
 *  enum 타입을 생성해주기 위해 사용합니다
 *
 *  ex)
 *
 *  export class UserDto {
 *    @Expose()
 *    @EnumType(Role, 'Role')
 *    role: Role
 *  }
 *
 */
export function EnumType(enumType: any, enumName: string) {
  return applyDecorators(ApiProperty({ enum: enumType, enumName }));
}
