export default obj => {
  if (typeof obj !== 'object' || Object.keys(obj).length === 0) {
    throw new Error('Wrong data type');
  }
  return Object.keys(obj).length > 0;
};
