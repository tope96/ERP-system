/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('kategoria_wniosku', {
      IdKategoriaWniosku: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      Nazwa: {
        type: DataTypes.STRING(25),
        allowNull: true
      },
    }, {
      tableName: 'kategoria_wniosku',
      timestamps: false
    });
  };
  