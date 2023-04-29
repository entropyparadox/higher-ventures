import { FileCategory } from 'apps/domain/common/enum';
import { EnumType } from 'apps/domain/common/enum-type.decorator';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class CreatePresignedPostDto {
  /*
   * 파일 카테고리
   */
  @IsEnum(FileCategory)
  @EnumType(FileCategory, 'FileCategory')
  fileCategory: FileCategory;

  /*
   * 파일명
   */
  @IsString()
  fileName: string;

  /*
   * Content-Type
   *
   * @example "image/png"
   */
  @IsString()
  @IsOptional()
  contentType?: string;
}
