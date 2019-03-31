/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('czlonkowie_zespolow', {
    IdPracownik: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'pracownicy',
        key: 'IdPracownik'
      }
    },
    IdZespol: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'zespoly',
        key: 'IdZespol'
      }
    }
  }, {
    tableName: 'czlonkowie_zespolow'
  });
};
