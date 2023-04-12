
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
  import { JwtService } from '@nestjs/jwt';
import { NatsContext } from '@nestjs/microservices';
  
  import { Request } from 'express';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService,
        private configService: ConfigService
        ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
        // console.log('context', context);
        const data = context.switchToRpc().getData();
      const token = this.extractTokenFromHeader(data.headers);
      if (!token) {
        throw new UnauthorizedException();
      }
      try {
        const payload = await this.jwtService.verifyAsync(
          token,
          {
            secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
          }
        );
        data['user'] = payload;
        // request['user'] = payload;
        // request.user['roles'] = 'business-owner'
      } catch {
        throw new UnauthorizedException();
      }
      return true;
    }
  
    private extractTokenFromHeader(request: any): string | undefined {
      // console.log('yo',request)
      const [type, token] = request.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }