import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { generateAlphaNumToken } from 'apps/infrastructure/utils';
import axios from 'axios';
import * as crypto from 'crypto';
import * as iconv from 'iconv-lite';
import * as moment from 'moment-timezone';
import * as qs from 'qs';

import {
  ApproveBillingRequest,
  ApproveBillingResponse,
  CancelPaymentRequest,
  CancelPaymentResponse,
  PayServiceResult,
  RegistBillingRequest,
  RegistBillingResponse,
  RemoveBillingRequest,
  RemoveBillingResponse,
} from './types';

@Injectable()
export class NicePayService {
  private TEST_MID = 'nictest04m';
  private TEST_MERCHANT_KEY =
    'b+zhZ4yOZ7FsH8pm5lhDfHZEb79tIwnjsdA0FBXh86yLc6BJeFVrZFXhAoJ3gEWgrWwN+lJMV0W4hvDdbe4Sjw==';
  private host: string;
  private mid: string;
  private merchantKey: string;

  constructor(private readonly configService: ConfigService) {
    this.host = 'https://webapi.nicepay.co.kr/';
    this.mid = configService.get('NICE_PAY_MID') ?? this.TEST_MID;
    this.merchantKey =
      configService.get('NICE_PAY_MERCHANT_KEY') ?? this.TEST_MERCHANT_KEY;
  }

  // 빌링 키 등록
  async registBilling(
    request: RegistBillingRequest,
  ): Promise<PayServiceResult<RegistBillingResponse>> {
    const {
      cardNumber,
      expireYear,
      expireMonth,
      cardPassword,
      idNo,
      buyerName,
      buyerTel,
      buyerEmail,
    } = request;

    const orderId = this.createBillingOrderId();
    const cardData = {
      CardNo: cardNumber,
      ExpYear: expireYear,
      ExpMonth: expireMonth,
      CardPw: cardPassword,
      IDNo: idNo,
    };
    const encData = this.getEncData(qs.stringify(cardData));
    const ediDate = this.getEdiDate();
    const signData = this.getSignData(
      `${this.mid}${ediDate}${orderId}${this.merchantKey}`,
    );
    const reqData = {
      MID: this.mid,
      EdiDate: ediDate,
      Moid: orderId,
      EncData: encData,
      SignData: signData,
      BuyerName: buyerName,
      BuyerTel: buyerTel,
      BuyerEmail: buyerEmail,
      CharSet: 'utf-8',
    };

    try {
      const response = await axios.post(
        `${this.host}/webapi/billing/billing_regist.jsp`,
        this.urlencode(reqData),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );
      const data: RegistBillingResponse = RegistBillingResponse.fromRawData(
        response.data,
      );

      // F100 === 성공코드
      return {
        success: data.resultCode === 'F100',
        response: data,
      };
    } catch (err) {
      console.log(err.message);
      throw err;
    }
  }

  // 빌링 결제 승인
  async approveBilling(
    request: ApproveBillingRequest,
  ): Promise<PayServiceResult<ApproveBillingResponse>> {
    const { bid, orderId, amount, goodsName, buyerName, buyerTel, buyerEmail } =
      request;
    const ediDate = this.getEdiDate();
    const signData = this.getSignData(
      `${this.mid}${ediDate}${orderId}${amount}${bid}${this.merchantKey}`,
    );
    const tid = this.createTID();
    const reqData = {
      BID: bid,
      MID: this.mid,
      TID: tid,
      EdiDate: ediDate,
      Moid: orderId,
      Amt: amount,
      GoodsName: goodsName,
      SignData: signData,
      CardInterest: 0,
      CardQuota: '00',
      BuyerName: buyerName,
      BuyerTel: buyerTel,
      BuyerEmail: buyerEmail,
      CharSet: 'utf-8',
    };

    try {
      const response = await axios.post(
        `${this.host}/webapi/billing/billing_approve.jsp`,
        this.urlencode(reqData),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      const data: ApproveBillingResponse = ApproveBillingResponse.fromRawData(
        response.data,
      );

      console.log(data);

      // 3001 === 성공코드
      return {
        success: data.resultCode === '3001',
        response: data,
      };
    } catch (err) {
      console.log(err.message);
      throw err;
    }
  }

  // 빌링 키 삭제
  async removeBilling(
    request: RemoveBillingRequest,
  ): Promise<PayServiceResult<RemoveBillingResponse>> {
    const { bid } = request;
    const orderId = this.createBillingOrderId();
    const ediDate = this.getEdiDate();
    const signData = this.getSignData(
      `${this.mid}${ediDate}${orderId}${bid}${this.merchantKey}`,
    );
    const reqData = {
      BID: bid,
      MID: this.mid,
      EdiDate: ediDate,
      Moid: orderId,
      SignData: signData,
      CharSet: 'utf-8',
    };

    try {
      const response = await axios.post(
        `${this.host}/webapi/billing/billkey_remove.jsp`,
        this.urlencode(reqData),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      const data: RemoveBillingResponse = RemoveBillingResponse.fromRawData(
        response.data,
      );

      // F101 === 성공코드
      return {
        success: data.resultCode === 'F101',
        response: data,
      };
    } catch (err) {
      console.log(err.message);
      throw err;
    }
  }

  // 결제 취소
  async cancelPayment(
    request: CancelPaymentRequest,
  ): Promise<PayServiceResult<CancelPaymentResponse>> {
    const { tid, orderId, cancelAmount, cancelReason, isPartialCancel } =
      request;
    const ediDate = this.getEdiDate();
    const signData = this.getSignData(
      `${this.mid}${cancelAmount}${ediDate}${this.merchantKey}`,
    );
    const reqData = {
      TID: tid,
      MID: this.mid,
      Moid: orderId,
      CancelAmt: cancelAmount,
      CancelMsg: cancelReason,
      PartialCancelCode: isPartialCancel ? '1' : '0',
      EdiDate: ediDate,
      SignData: signData,
      CharSet: 'utf-8',
    };

    try {
      const response = await axios.post(
        `${this.host}/webapi/cancel_process.jsp`,
        this.urlencode(reqData),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      const data: CancelPaymentResponse = CancelPaymentResponse.fromRawData(
        response.data,
      );

      // 2001 === 성공코드
      return {
        success: data.resultCode === '2001',
        response: data,
      };
    } catch (err) {
      console.log(err.message);
      throw err;
    }
  }

  /* 나이스페이 빌링 API 가이드에 따라 작성된 유틸 함수들 */

  // 빌링 정보를 암호화
  private getEncData(plain: string): string {
    const encryptionKey = this.merchantKey.substring(0, 16);
    const cipher = crypto.createCipheriv(
      'aes-128-ecb',
      Buffer.from(encryptionKey),
      null,
    );
    let encData = cipher.update(plain, 'utf8', 'hex');
    encData += cipher.final('hex');
    return encData;
  }

  // 위변조 검증값
  private getSignData(plain: string): string {
    return crypto.createHash('sha256').update(plain).digest('hex');
  }

  // 전문생성일시
  private getEdiDate(): string {
    return moment().format('yyyyMMddHHmmss');
  }

  // 거래ID 생성
  private createTID(): string {
    const datetime = moment().format('yyMMddHHmmss');
    const payMethod = '01'; // 지불수단 (신용카드)
    const payType = '16'; // 매체구분 (빌링)
    return `${this.mid}${payMethod}${payType}${datetime}${generateAlphaNumToken(
      4,
    )}`;
  }

  private createBillingOrderId(): string {
    const timestamp = +new Date();
    const random = generateAlphaNumToken(8);
    return `billing_${timestamp}_${random}`;
  }

  // 파라미터 데이터를 euc-kr 변환 후 url encoding
  private urlencode(data: any): string {
    return qs.stringify(data, {
      encoder: (str) => {
        return [...iconv.encode(str.toString(), 'euc-kr')]
          .map((n) => `%${n.toString(16)}`)
          .join('')
          .toUpperCase();
      },
    });
  }
}
