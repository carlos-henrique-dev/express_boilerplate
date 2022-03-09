import 'dotenv/config';
import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import UserRouter from './routes/user.routes';

const { PORT = 3000 } = process.env;

const app = express();

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

/* DEFINING ROUTES */

app.use('/users', UserRouter)

app.listen(PORT, () => console.log(`Server started at port: ${PORT} 🚀🚀`));
