import express from 'express';
import router from './routes';
import bodyParser from "body-parser";
import joiError from './infra/handlers/joiError';
import celebrateError from './infra/handlers/celebrateError';
import cors from 'cors';

const app = express();

app.use(cors());

app.use(bodyParser.json({limit: '10mb'}));

app.use(express.json());
app.use(router);
app.use(celebrateError);

export default app;