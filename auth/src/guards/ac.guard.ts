import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IQueryInfo } from 'accesscontrol';

// import { RolesBuilder } from '../roles-builder.class';
// import { Role } from 'nest-access-control/role.interface';
import { InjectRolesBuilder } from 'src/decorators/inject-roles-builder.decorator';
import { Role } from 'nest-access-control/role.interface';
import { RolesBuilder } from 'nest-access-control/roles-builder.class';
import UserDb from 'src/mock/user';
@Injectable()
export class ACGuard<User extends any = any> implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @InjectRolesBuilder() private readonly roleBuilder: RolesBuilder,
  ) {}

  protected async getUser(context: ExecutionContext): Promise<User> {
    const user = context.switchToRpc().getData().user;
    return user;
  }

  protected async getUserRoles(context: ExecutionContext): Promise<string | string[]> {
    const user:any = await this.getUser(context);
    if (!user) throw new UnauthorizedException();
    const userRole = UserDb.find(u => u.id == user.id).roles;
    return userRole;
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<Role[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }

    const userRoles = await this.getUserRoles(context);
    const hasRoles = roles.every((role) => {
      const queryInfo: IQueryInfo = role;
      queryInfo.role = userRoles;
      const permission = this.roleBuilder.permission(queryInfo);
      return permission.granted;
    });
    return hasRoles;
  }
}