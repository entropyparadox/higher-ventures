import { IsEmail, IsString } from 'class-validator';

export class SignUpDto {
  /*
   * 이메일
   *
   * @example user@gmail.com
   */
  @IsEmail()
  @IsString()
  email: string;

  /*
   * 비밀번호
   *
   * @example asdfasdf
   */
  @IsString()
  password: string;

  /*
   * 이름
   *
   * @example 홍길동
   */
  @IsString()
  name: string;
}
