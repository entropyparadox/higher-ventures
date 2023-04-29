import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleStrategy } from 'apps/domain/auth/role.strategy';
import { PermissionDeniedException } from 'apps/infrastructure/error';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly strategy: RoleStrategy,
  ) {}

  async canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    const isPublic = this.reflector.get<boolean>(
      'public',
      context.getHandler(),
    );

    try {
      const isAuthorized = await this.strategy.authorizeRole(
        context,
        requiredRoles,
        isPublic,
      );

      if (!isAuthorized) {
        throw new PermissionDeniedException();
      }
    } catch (err) {
      throw new PermissionDeniedException();
    }

    return true;
  }
}
