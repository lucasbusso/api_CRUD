const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const { getProperties } = require("../utils/handleEngineProperties");
const IDproperty = getProperties();

const tokenSign = async (user) => {
  const sign = jwt.sign(
    {
      [IDproperty.id]: user[IDproperty.id], // es dinámico porque en la DB noSQL el campo es _id y en la SQL es solo id
      role: user.role,
      name: user.firstName,
      email: user.email,
    },
    JWT_SECRET,
    {
      expiresIn: "2h",
    }
  );

  return sign;
};

const verifyToken = async (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

module.exports = { tokenSign, verifyToken };
