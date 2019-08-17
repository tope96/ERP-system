/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('srodki_trwale', {
    IdSrodkiTrwale: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    IdPracownik: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      defaultValue: '0',
      references: {
        model: 'pracownicy',
        key: 'IdPracownik'
      }
    },
    Nazwa: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    Opis: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: 'NULL'
    },
    Rodzaj: {
      type: DataTypes.STRING(25),
      allowNull: true,
      defaultValue: 'NULL'
    },
    WartoscNetto: {
      type: DataTypes.INTEGER(10),
      allowNull: false
    },
    DataZakupu: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    Ilosc: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    },
    IdZespol: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      references: {
        model: 'zespolydomenowe',
        key: 'IdZespolyDomenowe'
      }
    }
  }, {
    tableName: 'srodki_trwale',
    timestamps: false
  });
};
