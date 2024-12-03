const bcrypt = require('bcryptjs');
const catchAsync = require('./catchAsync');

const hashPasword = catchAsync(async (password) => {
  const hashedPassword = await bcrypt.hash(password, 12);
  return hashedPassword;
});

const comparePassword = (candidatePassword, hashedPassword) => {
  return bcrypt.compare(candidatePassword, hashedPassword);
};

module.exports = {
  hashPasword,
  comparePassword,
};
