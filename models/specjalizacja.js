/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('specjalizacja', {
    IdSpecjalizacja: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    Nazwa: {
      type: DataTypes.STRING(25),
      allowNull: false
    }
  }, {
    tableName: 'specjalizacja',
    timestamps: false
  });
};
