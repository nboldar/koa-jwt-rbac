import validateObject from '../util/validateObject';

export default class UserEntity {
  constructor(src = {}) {
    if (!validateObject(src)) throw new Error(`User not created, wrong props`);
    if (src.id) {
      this.id = src.id;
    }
    if (src.role) {
      this.role = src.role;
    }
    this.email = src.email;
    this.newEmail = src.newEmail || null;
    this.passwordHash = src.passwordHash;
  }
}
