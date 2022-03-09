import { createClient } from 'redis';

export type RedisClientType = ReturnType<typeof createClient>;

export class CacheService {
  client = {} as RedisClientType;

  constructor() {
    this.client = createClient({ url: 'redis://sp_redis:6379' });
    this.connect();
  }

  connect = async () => {
    this.client.connect();
  };

  disconnect = async () => {
    this.client.disconnect();
  };

  setValue = async (key: string, value: any) => {
    console.log(`⏳ Caching ${key}... `);
    return this.client.set(`SP_${key}`, JSON.stringify(value));
  };

  getValue = async (key: string) => {
    console.log(`⏳ Getting cached ${key}...`);
    const value = await this.client.get(`SP_${key}`);

    if (value) {
      return JSON.parse(value);
    } else {
      return null;
    }
  };

  deleteValue = async (key: string) => {
    console.log(`⏳ Deleting cached ${key}...`);

    return this.client.del(`SP_${key}`);
  };
}
