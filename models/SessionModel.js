import BaseModel from './BaseModel';
import config from '../config/config';

export default class SessionModel extends BaseModel {
  static get tableName() {
    return 'sessions';
  }

  static async getByRefreshToken(refreshToken) {
    const data = await this.query().where({ refreshToken });
    return data[0];
  }

  static async deleteAllSessionsByUserId(userId) {
    const model = this.constructor.name;
    try {
      await this.query()
        .delete()
        .where('userId', userId);
    } catch (e) {
      throw new Error(`Model::${model}. Message: ${e.message}`);
    }
  }

  static async insertSession(props = {}) {
    try {
      const sessionsNum = await this.query()
        .where('userId', props.userId)
        .count();
      if (Number(sessionsNum) >= config.maxSessionsQuantity) {
        this.deleteAllSessionsByUserId(props.userId);
        throw new Error('Too much sessions, login again please');
      }
      return this.insertModel(props);
    } catch (e) {
      throw new Error(e.message);
    }
  }
}
