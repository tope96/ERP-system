/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('projekty', {
    IdProjekt: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    IdKlient: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      references: {
        model: 'klienci',
        key: 'IdKlient'
      }
    },
    KategoriaProjektu: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      references: {
        model: 'kategoria_projektu',
        key: 'IdKategoriaProjektu'
      }
    },
    DataRozpoczecia: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    DataZakonczenia: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    IdZespol: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      references: {
        model: 'zespolydomenowe',
        key: 'IdZespolyDomenowe'
      }
    },
    Nazwa: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: 'NULL'
    },
    Opis: {
      type: DataTypes.STRING(300),
      allowNull: true,
      defaultValue: 'NULL'
    }
  }, {
    tableName: 'projekty',
    timestamps: false
  });
};
