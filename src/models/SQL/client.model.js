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
      type: String,
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
  },
  {
    timestamps: true,
  }
);

Client.belongsTo(User, {
  foreignKey: {
    name: "userId", // Nombre de la clave foránea en la tabla `clients`
    allowNull: false, // Asegurar que la clave foránea no sea nula
  },
  onDelete: "CASCADE", // Opcional: Eliminar un cliente si se elimina el usuario
});

module.exports = Client;
