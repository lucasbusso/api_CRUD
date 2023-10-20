const handleHttpError = require("../utils/handleError");

/**
 * String array with the role names
 * @param (string) role
 */
const checkRole = (roles) => (req, res, next) => {
  try {
    const { user } = req;
    const rolesByUser = user.role;
    const checkRole = roles.some((userRole) => rolesByUser.includes(userRole));
    if (!checkRole) return handleHttpError(res, "ROLE_PERMISSION_ERROR", 401);
    next();
  } catch (error) {
    handleHttpError(res, "ROLE_ERROR", 401);
  }
};
module.exports = checkRole;
