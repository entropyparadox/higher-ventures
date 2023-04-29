import { plainToClass } from 'class-transformer';

export type PayServiceResult<T> = {
  success: boolean;
  response: T;
};

/* 빌키 생성 */
export type RegistBillingRequest = {
  cardNumber: string;
  expireYear: string;
  expireMonth: string;
  cardPassword?: string;
  idNo?: string;
  buyerName?: string;
  buyerEmail?: string;
  buyerTel?: string;
};

export class RegistBillingResponse {
  resultCode: string;
  resultMsg: string;
  tid: string;
  bid: string;
  authDate: string;
  cardCode: string;
  cardName: string;

  static fromRawData(data: any): RegistBillingResponse {
    return plainToClass(RegistBillingResponse, {
      resultCode: data['ResultCode'],
      resultMsg: data['ResultMsg'],
      tid: data['TID'],
      bid: data['BID'],
      authDate: data['AuthDate'],
      cardCode: data['CardCode'],
      cardName: data['CardName'],
    });
  }
}

/* 빌키 승인 */
export type ApproveBillingRequest = {
  bid: string;
  orderId: string;
  amount: number;
  goodsName: string;
  buyerName?: string;
  buyerEmail?: string;
  buyerTel?: string;
};

export class ApproveBillingResponse {
  resultCode: string;
  resultMsg: string;
  mid: string;
  tid: string;
  orderId: string;
  goodsName: string;
  amount: number;
  authCode: string;
  authDate: string;
  acquCardCode: string;
  acquCardName: string;
  cardCode: string;
  cardName: string;
  cardQuota: string;
  cardInterest: string;
  cardCl: string;
  cardNumber: string;
  buyerName: string;
  ccPartCl: string;
  mallReserved: string;

  static fromRawData(data: any): ApproveBillingResponse {
    return plainToClass(ApproveBillingResponse, {
      resultCode: data['ResultCode'],
      resultMsg: data['ResultMsg'],
      mid: data['MID'],
      tid: data['TID'],
      orderId: data['Moid'],
      goodsName: data['GoodsName'],
      amount: parseInt(data['Amt']),
      authCode: data['AuthCode'],
      authDate: data['AuthDate'],
      acquCardCode: data['AcquCardCode'],
      acquCardName: data['AcquCardName'],
      cardCode: data['CardCode'],
      cardName: data['CardName'],
      cardQuota: data['CardQuota'],
      cardInterest: data['CardInterest'],
      cardCl: data['CardCl'],
      cardNumber: data['CardNo'],
      buyerName: data['BuyerName'],
      ccPartCl: data['CcPartCl'],
      mallReserved: data['MallReserved'],
    });
  }
}

/* 빌키 삭제 */
export type RemoveBillingRequest = {
  bid: string;
};

export class RemoveBillingResponse {
  resultCode: string;
  resultMsg: string;
  tid: string;
  bid: string;
  authDate: string;

  static fromRawData(data: any): RemoveBillingResponse {
    return plainToClass(RemoveBillingResponse, {
      resultCode: data['ResultCode'],
      resultMsg: data['ResultMsg'],
      tid: data['TID'],
      bid: data['BID'],
      authDate: data['AuthDate'],
    });
  }
}

/* 결제 취소 */
export type CancelPaymentRequest = {
  tid: string;
  orderId: string;
  cancelAmount: number;
  cancelReason: string;
  isPartialCancel: boolean;
};

export class CancelPaymentResponse {
  resultCode: string;
  resultMsg: string;
  errorCode: string;
  errorMsg: string;
  tid: string;
  mid: string;
  orderId: string;
  cancelAmount: number;
  signature: string;
  payMethod: string;
  cancelDate: string;
  cancelTime: string;
  cancelNumber: string;
  remainAmount: number;
  mallReserved: string;

  static fromRawData(data: any): CancelPaymentResponse {
    return plainToClass(CancelPaymentResponse, {
      resultCode: data['ResultCode'],
      resultMsg: data['ResultMsg'],
      errorCode: data['ErrorCD'],
      errorMsg: data['ErrorMsg'],
      tid: data['TID'],
      mid: data['MID'],
      orderId: data['Moid'],
      cancelAmount: parseInt(data['CancelAmt']),
      signature: data['Signature'],
      payMethod: data['PayMethod'],
      cancelDate: data['CancelDate'],
      cancelTime: data['CancelTime'],
      cancelNumber: data['CancelNum'],
      remainAmount: parseInt(data['RemainAmt']),
      mallReserved: data['MallReserved'],
    });
  }
}
