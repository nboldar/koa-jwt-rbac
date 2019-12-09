import fs from 'fs';

export default path => {
  const entityMap = new Map();
  fs.readdirSync(path)
    .filter(fn => fn !== 'index.js')
    .forEach(entityName => {
      entityMap.set(
        entityName.substring(0, entityName.length - 3),
        require(`./${entityName}`).router,
      );
    });
  return entityMap;
};
