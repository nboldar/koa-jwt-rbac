import router from '../routes/index';
import RootAction from '../actions/common/RootAction';

class CommonController {
  get router() {
    router.get('/', RootAction.run);
    return router;
  }
}

export default new CommonController();
