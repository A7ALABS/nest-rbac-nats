import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { AuthGuard } from './guards/auth.guard';
import { ACGuard } from './guards/ac.guard';
import { UseRoles } from 'nest-access-control';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(AuthGuard, ACGuard)
  @UseRoles({
    resource:  'business-info',
    action:  'read',
    possession:  'any',
  })
  @MessagePattern('register')
  register(): any {
    return 'registered';
  }
}
