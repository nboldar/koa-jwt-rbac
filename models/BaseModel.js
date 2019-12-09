import validateObject from '../util/validateObject';
import db from '../db/db';

class BaseModel extends db {
  // constructor(props) {
  //   super();
  //   // eslint-disable-next-line no-unused-vars
  //   const { schema } = this.constructor;
  //   Object.keys(props).forEach(propName => {
  //     Object.defineProperty(this, propName, {
  //       get: () => props[propName],
  //       // eslint-disable-next-line no-return-assign
  //       set: value => (props[propName] = value),
  //       enumerable: true,
  //       configurable: false,
  //     });
  //   });
  //   return Object.freeze(this);
  // }

  static async getById(id) {
    return this.query().findById(id);
  }

  static async getAll() {
    return this.query();
  }

  static async insertModel(props = {}) {
    if (!validateObject(props)) {
      throw new Error(
        `Db insert crashed: wrong props model-${this.constructor.name}`,
      );
    }
    // eslint-disable-next-line no-multi-assign
    props.createdAt = props.updatedAt = Date.now();
    return this.query().insert(props);
  }

  static update(id, props = {}) {
    if (!validateObject(props)) {
      throw new Error(
        `Db update crashed: wrong props model-${this.constructor.name}`,
      );
    }
    props.updatedAt = Date.now();
    return this.query()
      .findById(id)
      .patch(props);
  }

  static async deleteById(id) {
    return this.query().deleteById(id);
  }
}

export default BaseModel;
