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
      type: DataTypes.STRING(25),
      allowNull: true,
      defaultValue: 'NULL'
    },
    Email: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    NumerTelefonu: {
      type: DataTypes.INTEGER(6),
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
    }
  }, {
    tableName: 'pracownicy',
    timestamps: false
  });
};
