const bcrypt = require('bcryptjs');

const hashPasword = (password) => {
  const hashedPassword = bcrypt.hash(password, 12);
  return hashedPassword;
};

const comparePassword = (candidatePassword, hashedPassword) => {
  return bcrypt.compare(candidatePassword, hashedPassword);
};

module.exports = {
  hashPasword,
  comparePassword,
};
