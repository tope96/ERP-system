/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('kategoria_projektu', {
    IdKategoriaProjektu: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    Nazwa: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    IdZespolDomenowy: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'zespolydomenowe',
        key: 'IdZespolyDomenowe'
      }
    }
  }, {
    tableName: 'kategoria_projektu',
    timestamps: false 
  });
};
