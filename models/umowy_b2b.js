/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('umowy_b2b', {
    IdUmowy: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    NazwaFirmy: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    AdresFirmy: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    ZakazKonkurencji: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'umowy_b2b'
  });
};
