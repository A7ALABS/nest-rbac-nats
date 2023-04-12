import { Controller,  Get,  Inject, Post, Req, Response } from '@nestjs/common';
import { ClientProxy, Payload } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Controller()
export class AppController {
  constructor(
    @Inject('AUTH_SERVICE') private authClient: ClientProxy,
  ) {}
    
  @Get('/access-auth')
  async accessAuth( @Req() req: any, @Response() response: any)  {
    try{
      const res = await lastValueFrom(
        this.authClient.send('register', {headers: req.headers})
      );
      return response.status(res.code || 200).json(res);
    } catch(e){
      console.log("error", e);
      return response.status(500).json(e.message);
    } 
  }
}
