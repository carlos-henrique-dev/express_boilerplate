import 'dotenv/config';
import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';

const { PORT = 3000 } = process.env;

const app = express();

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

app.get('/', (req, res) => res.status(201).send('<h1>Hello Wsorld2</h1>'));

app.listen(PORT, () => console.log(`Server started at port: ${PORT} 🚀🚀`));
