import 'dotenv/config';
import 'reflect-metadata';

import express, { NextFunction } from 'express';
import logger from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import Routes from './routes';
import { initializeORM } from './configs/database/setupDatabase';
import { RequestContext } from '@mikro-orm/core';

const { PORT = 3000 } = process.env;

(async () => {
  const app = express();

  const Database = await initializeORM();

  /* DEFINING MIDDLEWARE */

  app.use(cors());
  app.use(
    logger('dev', {
      skip() {
        return process.env.APP_ENV === 'dev';
      },
    }),
  );
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  // passing database connection to routes as dependency injection
  app.use((req: any, _, next: NextFunction) => {
    RequestContext.create(Database.em, next);
    req.database = Database;
  });

  /* DEFINING ROUTES */

  for (const item of Routes) {
    if (item) {
      app.use(item.name, item.route(Database));
    }
  }

  app.listen(PORT, () => console.log(`Server started at port: ${PORT} 🚀🚀`));
})();
