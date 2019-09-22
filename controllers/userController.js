import User from '../entities/User'

export default class UserController {
    addUser(data) {
        const user = new User(data);
        //user.addUser();
        return user;
    }
}

