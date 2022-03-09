import { MikroORM } from '@mikro-orm/core';

const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD, APP_ENV } = process.env;

export default {
  type: 'postgresql',
  user: DB_USER,
  password: DB_PASSWORD,
  dbName: DB_NAME,
  host: DB_HOST,
  port: DB_PORT,
  entities: ['../**/*.model.js'],
  entitiesTs: ['../**/*.model.ts'],
  cache: {
    enabled: true,
    pretty: true,
    options: { cacheDir: process.cwd() + '/temp' },
  },
  tsNode: APP_ENV === 'dev',
  migrations: {
    path: './src/database/migrations',
    tableName: 'migrations',
    transactional: true,
    allOrNothing: true,
  },
  seeder: {
    path: './src/database/seeders',
    defaultSeeder: 'BaseSeeder',
  },
  debug: APP_ENV === 'dev',
} as Parameters<typeof MikroORM.init>[0];
