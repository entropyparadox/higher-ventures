import { ImpPayment } from 'apps/infrastructure/clients/iamport/types';
import { Column } from 'typeorm';

import {
  PaymentCurrency,
  PaymentStatus,
  reverseMapPaymentStatus,
} from '../common/enum';
import { TypeOrmEntity } from '../common/typeorm.entity';

// 아임포트 결제주문 Base 엔티티
export class ImpPaymentOrder extends TypeOrmEntity {
  /* 주문자 정보 */
  @Column({ nullable: true, comment: '주문자 이메일' })
  buyerEmail?: string;

  @Column({ nullable: true, comment: '주문자 이름' })
  buyerName?: string;

  @Column({ nullable: true, comment: '주문자 연락처' })
  buyerTel?: string;

  /* 결제주문 정보 */
  @Column({ nullable: true, comment: '아임포트 결제 고유 UID' })
  impUid?: string;

  @Column({ nullable: true, comment: '가맹점에서 생성한 거래 고유 UID' })
  merchantUid: string;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    comment: '결제상태 (default: READY)',
    default: PaymentStatus.READY,
  })
  status: PaymentStatus;

  @Column({ comment: '주문명' })
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, comment: '총주문금액' })
  totalAmount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, comment: '실결제금액' })
  actualAmount: number;

  @Column({ nullable: true, comment: '결제시작시점 (결제창오픈시각)' })
  startedAt?: Date;

  @Column({ nullable: true, comment: '신용카드 매출전표 확인 URL' })
  receiptUrl?: string;

  @Column({ nullable: true, comment: '현금영수증 자동발급 여부' })
  isCacheReceiptIssued?: boolean;

  /* 결제정보 */
  @Column({
    type: 'enum',
    enum: PaymentCurrency,
    comment: '결제승인화폐단위(KRW:원, USD:미화달러, EUR:유로)',
  })
  currency: PaymentCurrency;

  @Column({ nullable: true, comment: '결제경로' })
  channel?: string;

  @Column({ nullable: true, comment: 'PG사' })
  pgProvider?: string;

  @Column({ nullable: true, comment: 'PG사 승인정보' })
  pgTid?: string;

  @Column({ nullable: true, comment: '거래가 처리된 PG사 상점아이디' })
  pgId?: string;

  @Column({ nullable: true, comment: '에스크로결제 여부' })
  escrow?: boolean;

  @Column({
    nullable: true,
    comment: '카드사 승인정보(계좌이체/가상계좌는 값 없음)',
  })
  applyNum?: string;

  @Column({ nullable: true, comment: '은행 표준코드 - (금융결제원기준) ' })
  bankCode?: string;

  @Column({
    nullable: true,
    comment: '은행 명칭 - (실시간계좌이체 결제 건의 경우)',
  })
  bankName?: string;

  @Column({
    nullable: true,
    comment: '카드사 코드번호(금융결제원 표준코드번호)',
  })
  cardCode?: string;

  @Column({
    nullable: true,
    comment: '카드사 명칭 - (신용카드 결제 건의 경우)',
  })
  cardName?: string;

  @Column({ nullable: true, comment: '할부개월 수(0이면 일시불)' })
  cardQuota?: number;

  @Column({ nullable: true, comment: '결제에 사용된 마스킹된 카드번호' })
  cardNumber?: string;

  // (주의)해당 정보를 제공하지 않는 일부 PG사의 경우 null 로 응답됨
  // (ex. JTNet, 이니시스-빌링) = ['null', '0(신용카드)', '1(체크카드)']
  @Column({ nullable: true, comment: '카드유형, 0: 신용카드, 1: 체크카드' })
  cardType?: number;

  @Column({
    nullable: true,
    comment: '가상계좌 은행 표준코드 - (금융결제원기준)',
  })
  vbankCode?: string;

  @Column({ nullable: true, comment: '입금받을 가상계좌 은행명' })
  vbankName?: string;

  @Column({ nullable: true, comment: '입금받을 가상계좌 계좌번호' })
  vbankNum?: string;

  @Column({ nullable: true, comment: '입금받을 가상계좌 예금주' })
  vbankHolder?: string;

  @Column({
    nullable: true,
    comment: '입금받을 가상계좌 마감기한 UNIX timestamp',
  })
  vbankDate?: Date;

  @Column({ nullable: true, comment: '가상계좌 생성 시각 UNIX timestamp' })
  vbankIssuedAt?: Date;

  @Column({ nullable: true, comment: '결제완료일시' })
  paidAt?: Date;

  /* 결제취소정보 */
  @Column({ nullable: true, comment: '결제취소금액' })
  cancelAmount?: number;

  @Column({ nullable: true, comment: '결제취소일시' })
  cancelledAt?: Date;

  @Column({ nullable: true, comment: '결제취소사유' })
  cancelReason?: string;

  /* 결제실패정보 */
  @Column({ nullable: true, comment: '결제실패일시' })
  failedAt?: Date;

  @Column({ nullable: true, comment: '결제실패사유' })
  failReason?: string;

  // 결제주문정보를 아임포트결제내역으로 업데이트
  updateOrderWithImpPayment(payment: ImpPayment) {
    this.buyerEmail = payment.buyerEmail;
    this.buyerName = payment.buyerName;
    this.buyerTel = payment.buyerTel;
    this.impUid = payment.impUid;
    this.status = reverseMapPaymentStatus(payment.status);
    this.startedAt = payment.startedAt;
    this.receiptUrl = payment.receiptUrl;
    this.isCacheReceiptIssued = payment.isCacheReceiptIssued;
    this.channel = payment.channel;
    this.pgProvider = payment.pgProvider;
    this.pgTid = payment.pgTid;
    this.pgId = payment.pgId;
    this.escrow = payment.escrow;
    this.applyNum = payment.applyNum;
    this.bankCode = payment.bankCode;
    this.bankName = payment.bankName;
    this.cardCode = payment.cardCode;
    this.cardName = payment.cardName;
    this.cardQuota = payment.cardQuota;
    this.cardNumber = payment.cardNumber;
    this.cardType = payment.cardType;
    this.vbankCode = payment.vbankCode;
    this.vbankName = payment.vbankName;
    this.vbankHolder = payment.vbankHolder;
    this.vbankNum = payment.vbankNum;
    this.vbankDate = payment.vbankDate;
    this.vbankIssuedAt = payment.vbankIssuedAt;
    this.paidAt = payment.paidAt;
    this.cancelAmount = payment.cancelAmount;
    this.cancelledAt = payment.cancelledAt;
    this.cancelReason = payment.cancelReason;
    this.failedAt = payment.failedAt;
    this.failReason = payment.failReason;
  }
}
