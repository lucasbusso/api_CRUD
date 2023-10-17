const bcryptjs = require("bcrypt");

const encrypt = async (plainPassword) => {
  const hash = await bcryptjs.hash(plainPassword, 10);
  return hash;
};

const compare = async (plainPassword, hashPassword) => {
  return await bcryptjs.compare(plainPassword, hashPassword);
};

module.exports = { encrypt, compare };
