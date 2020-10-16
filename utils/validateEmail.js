const validateEmail = (string) => {
  const regex = /^[^@]+@[^@]+\.[^@]+$/;
  return regex.test(string);
};

export default validateEmail;
