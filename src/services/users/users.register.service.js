const { encrypt, compare } = require("../../utils/handlePassword");
const { userModel } = require("../../models");

const registerService = async (userData) => {
  const hashedPassword = await encrypt(userData.password);
  const user = await userModel.create({
    ...userData,
    password: hashedPassword,
  });
  user.set("password", undefined, { strict: false });
  return user;
};

module.exports = { registerService };
