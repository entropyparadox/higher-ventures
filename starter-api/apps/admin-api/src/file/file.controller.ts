import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Role } from 'apps/domain/common/enum';
import { CreatePresignedPostDto } from 'apps/domain/file/dto/create-presigned-post.dto';
import { PresignedPostDto } from 'apps/domain/file/dto/presigned-post.dto';
import { FileService } from 'apps/domain/file/file.service';
import { Roles } from 'apps/infrastructure/auth/roles.decorator';
import { plainToInstance } from 'class-transformer';

@Roles(Role.ADMIN)
@Controller()
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @ApiOperation({
    summary: '파일 업로드 주소 생성',
    tags: ['files'],
  })
  @ApiBearerAuth()
  @Post('files')
  async createPresignedPost(
    @Body() dto: CreatePresignedPostDto,
  ): Promise<PresignedPostDto> {
    const result = await this.fileService.createPresignedPost(dto);
    return plainToInstance(PresignedPostDto, result);
  }
}
