/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('administratorzy', {
    IdPracownik: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    PrzeszkolenieRODO: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    },
    LoginAdmin: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    HasloAdmin: {
      type: DataTypes.STRING(150),
      allowNull: true
    }
  }, {
    tableName: 'administratorzy'
  });
};
