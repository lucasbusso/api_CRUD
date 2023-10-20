const handleHttpError = (res, msg = "Me rompí", code = 403) => {
  res.status(code).send({ error: msg });
};

module.exports = handleHttpError;
