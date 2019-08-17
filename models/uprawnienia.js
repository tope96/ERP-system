/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('uprawnienia', {
    IdUprawnienie: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    Nazwa: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    Opis: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: 'NULL'
    }
  }, {
    tableName: 'uprawnienia',
    timestamps: false
  });
};
