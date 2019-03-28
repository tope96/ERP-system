/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('miasto', {
    IdMiasto: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    Miasto: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    tableName: 'miasto'
  });
};
