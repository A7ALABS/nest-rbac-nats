import { Transport } from '@nestjs/microservices';

class ConfigService {
  private readonly envConfig: { [key: string]: any };

  constructor() {
    this.envConfig = {
      development: {
        gateway: { ip: '0.0.0.0', port: 3000 },
        auth: { transport: Transport.NATS, servers: ['nats://localhost:4222'] },
        JWT_ACCESS_TOKEN_SECRET: "JWT_SECRET_KEY"
        // database: { ip: '127.0.0.1', port: 5432, user: 'poswastgres', password: 'postgres' },
      },
    };
  }

  get(key: string): any {
    if (process.env.LEVEL === undefined) {
      console.log(
        'LEVEL env variable has not been set. Please set it before attempting to read server config',
      );
      return '';
    }
    return this.envConfig[process.env.LEVEL][key];
  }
}

export default ConfigService;
