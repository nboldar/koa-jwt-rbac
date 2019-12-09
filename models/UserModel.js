import BaseModel from './BaseModel';

import validateEmail from '../util/validateEmail';

export default class UserModel extends BaseModel {
  static get tableName() {
    return 'users';
  }

  static async getByEmail(email) {
    if (!validateEmail(email)) {
      throw new Error(
        `Db getByEmail crashed: wrong email, model-${this.constructor.name}`,
      );
    }
    const entity = await this.query()
      .select()
      .where('email', email);
    return entity[0];
  }
}
