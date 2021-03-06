/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pracownicy', {
    IdPracownik: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    IdPrzelozony: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      defaultValue: '0',
      references: {
        model: 'pracownicy',
        key: 'IdPracownik'
      }
    },
    Imie: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    Nazwisko: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    Firma: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      references: {
        model: 'firma',
        key: 'IdFirma'
      }
    },
    Email: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    NumerTelefonu: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    },
    IdUmowy: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      defaultValue: '0',
      references: {
        model: 'umowy',
        key: 'IdUmowy'
      }
    },
    IdZespol: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      references: {
        model: 'zespolydomenowe',
        key: 'IdZespolyDomenowe'
      }
    },
    PlikUmowy: {
      type: DataTypes.STRING(150),
      allowNull: true,
      defaultValue: 'NULL'
    }
  }, {
    tableName: 'pracownicy',
    timestamps: false
  });
};
