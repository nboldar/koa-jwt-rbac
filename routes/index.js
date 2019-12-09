import Router from 'koa-router';
import checkPermission from '../middleware/checkPermission';

const router = new Router();
router.use(checkPermission);
export default router;
