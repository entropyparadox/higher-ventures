export enum FileCategory {
  IMAGE = 'IMAGE',
}

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export enum PaymentCurrency {
  USD = 'USD',
  KRW = 'KRW',
}

export enum PaymentStatus {
  READY = 'ready',
  PAID = 'paid',
  CANCELLED = 'cancelled',
  FAILED = 'failed',
}

export const reverseMapPaymentStatus = (value: string): PaymentStatus => {
  switch (value) {
    case PaymentStatus.READY: {
      return PaymentStatus.READY;
    }
    case PaymentStatus.PAID: {
      return PaymentStatus.PAID;
    }
    case PaymentStatus.CANCELLED: {
      return PaymentStatus.CANCELLED;
    }
    case PaymentStatus.FAILED: {
      return PaymentStatus.FAILED;
    }
  }
};
