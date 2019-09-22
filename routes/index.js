import Router from 'koa-router'
import auth from "../auth/auth";
import signup from "../auth/signup";
import isAuthenticated from "../auth/authenticated"
import confirmEmail from "../auth/confirmEmail";



const router = new Router();

router.get('/', isAuthenticated ,(ctx, next) => {
    ctx.body = {success: true}
});
router.post('/auth', auth);
router.post('/signup', signup);
router.get('/confirm_email',confirmEmail);
export default router;
