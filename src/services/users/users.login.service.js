const { compare } = require("../../utils/handlePassword");
const { userModel } = require("../../models");

const loginService = async (email, password) => {
  let user;

  if (process.env.DB_ENGINE === "nosql") {
    user = await userModel
      .findOne({ email })
      .select("password firstName role email");
  } else {
    user = await userModel.findOne({ where: { email: email } });
  }

  if (!user) {
    throw new Error("USER_NOT_REGISTERED");
  }

  const isMatch = await compare(password, user.get("password"));
  if (!isMatch) {
    throw new Error("PASSWORD_INCORRECT");
  }

  user.set("password", undefined, { strict: false });
  return user;
};

module.exports = loginService;
