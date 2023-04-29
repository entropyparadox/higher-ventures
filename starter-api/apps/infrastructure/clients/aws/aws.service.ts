import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';

@Injectable()
export class AwsService {
  private readonly bucketName: string;
  private readonly s3: S3;

  constructor(private readonly configService: ConfigService) {
    this.bucketName = configService.get('AWS_S3_BUCKET');
    this.s3 = new S3({
      region: configService.get('AWS_S3_REGION'),
      accessKeyId: configService.get('AWS_S3_ACCESS_KEY'),
      secretAccessKey: configService.get('AWS_S3_SECRET_KEY'),
    });
  }

  async getPresignedPost(
    folder: string,
    _filename: string,
    contentType?: string,
  ): Promise<S3.PresignedPost> {
    const filename = _filename.replace(/[^0-9a-zA-Z.]/g, '_');
    const key = `${folder}/${Date.now()}_${filename}`;
    const params = {
      Bucket: this.bucketName,
      Fields: {
        key,
        'Cache-Control': 'no-cache',
        ...(contentType && { 'Content-Type': contentType }),
      },
      Conditions: [['content-length-range', 0, this.convertMibToByte(50)]], // 50 MiB
    };

    return new Promise<S3.PresignedPost>((resolve, reject) => {
      this.s3.createPresignedPost(params, (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
  }

  private convertMibToByte(mib: number): number {
    return mib * 1024 * 1024;
  }
}
