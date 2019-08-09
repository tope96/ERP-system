/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('czlonkowie_grup_mailowych', {
    IdGrupaMailowa: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'grupy_mailowe',
        key: 'IdGrupaMailowa'
      }
    },
    IdKontoPocztowe: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'konta_pocztowe',
        key: 'IdKontoPocztowe'
      }
    }
  }, {
    tableName: 'czlonkowie_grup_mailowych',
    timestamps: false
  });
};
