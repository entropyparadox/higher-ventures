import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RuntimeException } from 'apps/infrastructure/error';
import { ApplicationLogger } from 'apps/infrastructure/logger/application.logger';
import axios from 'axios';

import { SearchDeliveryAreaResponse } from './types';

@Injectable()
export class TeamFreshService {
  private host = 'https://tmsapi.teamfresh.co.kr';
  private apiKey: string;

  constructor(
    private readonly logger: ApplicationLogger,
    private readonly configService: ConfigService,
  ) {
    this.apiKey = configService.get('TEAM_FRESH_API_KEY');
  }

  // 새벽배송 지역조회
  //
  // 주소를 입력받아, 해당 주소로 팀프레시 새벽배송이
  // 가능한지 여부를 반환합니다.
  async searchDeliveryArea(
    address: string,
  ): Promise<SearchDeliveryAreaResponse> {
    const path = `/api/area/searchDeliveryArea`;
    const url = this.host + path;

    const data = {
      addrBasic: address,
    };

    try {
      const response = await axios.post(url, data, {
        headers: {
          apiaccesskey: this.apiKey,
          'Content-Type': 'application/json',
        },
      });

      return SearchDeliveryAreaResponse.fromRawData(response.data);
    } catch (err) {
      this.logger.error({
        message: '팀프레시 API 통신 실패',
        err: err.message,
      });
      throw new RuntimeException(`팀프레시 API 통신 실패, ${err.message}`);
    }
  }
}
