import * as moment from 'moment-timezone';
import { customAlphabet } from 'nanoid';

// 랜덤 숫자 토큰 생성
export function generateNumericToken(length: number): string {
  return customAlphabet('1234567890', length)();
}

// 랜덤 숫자,알파벳 토큰 생성
export function generateAlphaNumToken(length: number): string {
  return customAlphabet(
    '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
    length,
  )();
}

// 날짜 포맷팅
export function formatDate(date: Date, format: string): string {
  return moment(new Date(date)).format(format);
}

// 파라미터 기준 하루 전 날짜 반환
export function yesterday(date: Date | string): Date {
  return moment(new Date(date)).subtract(1, 'day').toDate();
}

// 파라미터 기준 하루 후 날짜 반환
export function tomorrow(date: Date | string): Date {
  return moment(new Date(date)).add(1, 'day').toDate();
}

// 파라미터 기준 자정시간 반환
export function midnight(date: Date | string): Date {
  return moment(new Date(date)).startOf('day').toDate();
}
