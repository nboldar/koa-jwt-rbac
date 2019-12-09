import router from '../routes/index';
import LoginAction from '../actions/auth/LoginAction';
import SignupAction from '../actions/auth/SignupAction';
import ConfirmEmailAction from '../actions/auth/ConfirmEmailAction';
import RefreshTokenAction from '../actions/auth/RefreshTokenAction';

class AuthController {
  get router() {
    router.post('/login', LoginAction.run);
    router.post('/signup', SignupAction.run);
    router.get('/confirm_email', ConfirmEmailAction.run);
    router.post('/refresh_token', RefreshTokenAction.run);
    return router;
  }
}

export default new AuthController();
// console.log(new AuthController().router.stack[0]);
