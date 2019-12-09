import db from './db';
import isEmptyObj from '../util/validateObject';
import now from '../util/now';

export default async (tableName, where = {}, updateData = {}) => {
  if (typeof tableName !== 'string') {
    throw new Error('Wrong type of table name');
  }
  if (isEmptyObj(where)) {
    throw new Error('Can not process updating, where data is empty');
  }
  if (isEmptyObj(updateData)) {
    throw new Error('Can not process updating, no data to update');
  }
  try {
    updateData.updated_at = now();
    await db(tableName)
      .where(where)
      .update(updateData);
  } catch (e) {
    console.log(`Updating ${tableName} not finished, error: ${e}`);
    throw new Error(e);
  }
};
