import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getBusinessInfo( userRoles: any): string{
    console.log(userRoles);
    return "business-info accessed"
  }
}
