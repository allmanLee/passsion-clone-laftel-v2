const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "auth_email",
    {
      user_email: {
        type: DataTypes.STRING(45),
        allowNull: false,
        primaryKey: true,
      },
      auth_code: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "auth_email",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "user_email" }],
        },
        {
          name: "user_email_UNIQUE",
          unique: true,
          using: "BTREE",
          fields: [{ name: "user_email" }],
        },
      ],
    }
  );
};
