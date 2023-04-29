import { Injectable } from '@nestjs/common';
import { AwsService } from 'apps/infrastructure/clients/aws/aws.service';
import { S3 } from 'aws-sdk';

import { CreatePresignedPostDto } from './dto/create-presigned-post.dto';

@Injectable()
export class FileService {
  constructor(private readonly awsService: AwsService) {}

  async createPresignedPost(
    dto: CreatePresignedPostDto,
  ): Promise<S3.PresignedPost> {
    return this.awsService.getPresignedPost(
      dto.fileCategory,
      dto.fileName,
      dto.contentType,
    );
  }
}
