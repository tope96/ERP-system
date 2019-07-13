/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('kategoria_projektu', {
      IdKategoriaProjektu: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      Nazwa: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      IdZespolDomenowy: {
        type: DataTypes.INTEGER(11),
        allowNull: true
      },
    }, {
      tableName: 'kategoria_projektu',
      timestamps: false
    });
  };
  