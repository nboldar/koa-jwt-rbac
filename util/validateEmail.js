export default email => {
  const regExp = /\S+@\S+\.\S+/;
  return regExp.test(email);
};
