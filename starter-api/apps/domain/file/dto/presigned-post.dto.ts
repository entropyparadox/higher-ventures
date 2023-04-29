import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class PresignedPostDto {
  /*
   * 파일 업로드 URL
   */
  @Expose()
  url: string;

  /*
   * 파일 업로드시 body에 담아야 하는 데이터
   */
  @Expose()
  fields: any;
}
