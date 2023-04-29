import { plainToInstance } from 'class-transformer';

export class SearchDeliveryAreaResponse {
  // 결과코드
  //
  // @example "0000"
  resultCode: string;
  // 처리결과
  //
  // @example "통신성공"
  resultMsg: string;

  result?: {
    // 배송가능여부, 0: 배송불가, 1: 배송가능, 2: 다수주소검색됨
    deliveryYn: number;

    // 배송가능여부
    //
    // @example "배송가능"
    deliveryResult: string;

    // 배송가능시 센터명
    //
    // @example "센터1"
    hubName: string;

    // 배송가능시 배송권역
    //
    // @example "17B2"
    areaGroupLabel: string;
  };

  static fromRawData(data: any): SearchDeliveryAreaResponse {
    return plainToInstance(SearchDeliveryAreaResponse, {
      resultCode: data['resultCode'],
      resultMsg: data['resultMsg'],
      ...(data['result'] && {
        result: {
          deliveryYn: data['result']['delyverYn'],
          deliveryResult: data['result']['delyverResult'],
          hubName: data['result']['hubName'],
          areaGroupLabel: data['result']['areaGroupLabel'],
        },
      }),
    });
  }
}
