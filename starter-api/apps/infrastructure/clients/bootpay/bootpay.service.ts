import { RestClient } from '@bootpay/server-rest-client';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { CertificateData, CertificateResult } from './types';

@Injectable()
export class BootpayService {
  private applicationId: string;
  private privateKey: string;

  constructor(private readonly configService: ConfigService) {
    this.applicationId = configService.get('BOOTPAY_APPLICATION_ID');
    this.privateKey = configService.get('BOOTPAY_PRIVATE_KEY');
    RestClient.setConfig(this.applicationId, this.privateKey);
  }

  // 본인 인증
  async certificate(receiptId: string): Promise<CertificateResult> {
    try {
      await RestClient.getAccessToken();
      const result = await RestClient.certificate(receiptId);
      return {
        success: true,
        data: result.data.certificate as CertificateData,
      };
    } catch (err) {
      return {
        success: false,
      };
    }
  }
}
