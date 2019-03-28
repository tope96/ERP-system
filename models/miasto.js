/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('miasto', {
    IdMiasto: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    Miasto: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    tableName: 'miasto',
    timestamps: false
  });
};
