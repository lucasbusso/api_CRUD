const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");
const User = require("./user.model");

const Client = sequelize.define(
  "clients",
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    businessName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    antiquity: {
      type: DataTypes.STRING,
      defaultValue: Date.now(),
    },
    debt: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM(["proveedor", "cliente"]),
      defaultValue: "proveedor",
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Client;
