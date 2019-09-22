import Koa from 'koa'
import router from './routes'
import bodyParser from 'koa-bodyparser'
import dotenv from 'dotenv'
import errorHandler from "./middleware/errorHandler";
import logger from 'koa-logger'

dotenv.config();

const app = new Koa();
app.use(logger());
app.use(errorHandler);
app.use(router.routes())
    .use(router.allowedMethods());
app.use(bodyParser({enableTypes: ['json']}));
const port = process.env.PORT || 8082;
const server = app.listen(port);
console.log('Server running at ' + port);
