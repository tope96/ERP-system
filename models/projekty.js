/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('projekty', {
    IdProjekt: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    IdKlient: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'klienci',
        key: 'IdKlient'
      }
    },
    KategoriaProjektu: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    DataRozpoczecia: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    DataZakonczenia: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    tableName: 'projekty'
  });
};
