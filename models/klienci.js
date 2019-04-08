/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('klienci', {
    IdKlient: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    NazwaFirmy: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    ImiePrzedstawiciela: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    NazwiskoPrzedstawiciela: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    NumerKontaktowy: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    EmailKontaktowy: {
      type: DataTypes.STRING(25),
      allowNull: false
    }
  }, {
    tableName: 'klienci'
  });
};