/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('umowy_b2b', {
    IdUmowy: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    ZakazKonkurencji: {
      type: DataTypes.INTEGER(3),
      allowNull: false,
      defaultValue: '0'
    },
    IdFirma: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      references: {
        model: 'firma',
        key: 'IdFirma'
      }
    }
  }, {
    tableName: 'umowy_b2b',
    timestamps: false
  });
};
