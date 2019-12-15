import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import dotenv from 'dotenv';
// import logger from 'koa-logger';
import logger from 'koa-pino-logger';
import errorHandler from './middleware/errorHandler';
import router from './routes';
// eslint-disable-next-line import/no-named-as-default
import controllers from './controllers';
import checkAccessToken from './middleware/checkAccessToken';
import checkPermission from './middleware/checkPermission';

dotenv.config();

const app = new Koa();
app.silent = false;
app.use(logger({ prettyPrint: true }));
app.use(errorHandler);
app.use(bodyParser({ enableTypes: ['json', 'form'] }));
app.use(checkAccessToken);
app.use(checkPermission);
// eslint-disable-next-line no-restricted-syntax
for (const controller of controllers) {
  app.use(controller.router.routes());
}

app.use(router.allowedMethods());
const port = process.env.PORT || 8082;
const server = app.listen(port);
console.log(`Server running at ${port}`);

export default server;
