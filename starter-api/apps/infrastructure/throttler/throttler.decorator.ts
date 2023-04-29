import { applyDecorators, UseGuards } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';

import { ThrottlerGuard } from './throttler.guard';

export function Throttler(limit?: number, ttl?: number) {
  return applyDecorators(
    UseGuards(ThrottlerGuard),
    Throttle(limit ?? 1, ttl ?? 1),
  );
}
