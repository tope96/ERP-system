/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('programisci', {
    IdPracownik: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    IdSpecjalizacja: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'specjalizacja',
        key: 'IdSpecjalizacja'
      }
    }
  }, {
    tableName: 'programisci'
  });
};
