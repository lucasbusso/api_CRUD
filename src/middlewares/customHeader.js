const API_KEY = process.env.API_KEY

const customHeader = (req, res, next) => {
  try {
    const apiKey = req.headers.api_key;
    if (apiKey === API_KEY) {
      next();
    } else {
      res.status(403).send({ error: "API_KEY_ERROR" });
    }
  } catch (error) {
    res.status(403).send({ error: "API_KEY_ERROR" });
  }
};

module.exports = customHeader;
