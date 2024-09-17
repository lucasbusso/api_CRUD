// config.js
const DB_ENGINE = process.env.DB_ENGINE || "nosql"; // Default to 'nosql' if not set

const getProperties = () => {
  const data = {
    nosql: {
      id: "_id",
    },
    mysql: {
      id: "id",
    },
  };
  return data[DB_ENGINE];
};

module.exports = { getProperties };
