// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config('../../.env');

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]): any {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getTypeOrmConfig(): {
    cli: { entitiesDir: string };
    secretArn: string;
    type: any;
    password: string;
    database: string;
    driver: undefined;
    port: number;
    entities: string[];
    name: string;
    host: string;
    location: string;
    resourceArn: string;
    region: string;
    username: string;
    synchronize: boolean;
  } {
    return {
      driver: undefined,
      location: '',
      region: '',
      resourceArn: '',
      secretArn: '',
      name: 'default',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      type: (this.getValue('MESSAGING_DB_TYPE') as any) || 'mysql',
      port: parseInt(this.getValue('MESSAGING_DB_PORT')) || 3306,
      host: this.getValue('MESSAGING_DB_HOST') || 'localhost',
      username: this.getValue('MESSAGING_DB_USERNAME') || 'krish',
      password: this.getValue('MESSAGING_DB_PASSWORD') || 'root',
      database: this.getValue('MESSAGING_DB_NAME') || 'messaging',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      cli: {
        entitiesDir: 'src/database/entities',
      },
    };
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'MESSAGING_DB_TYPE',
  'MESSAGING_DB_HOST',
  'MESSAGING_DB_PORT',
  'MESSAGING_DB_USERNAME',
  'MESSAGING_DB_NAME',
]);

export { configService };
