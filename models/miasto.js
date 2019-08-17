/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('miasto', {
    IdMiasto: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    Miasto: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: 'NULL'
    }
  }, {
    tableName: 'miasto',
    timestamps: false
  });
};
