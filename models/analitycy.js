/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('analitycy', {
    IdPracownik: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    IdSpecjalizacja: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      references: {
        model: 'specjalizacja',
        key: 'IdSpecjalizacja'
      }
    },
    Certyfikaty: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'analitycy',
    timestamps: false
  });
};
