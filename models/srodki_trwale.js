/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('srodki_trwale', {
    IdSrodkiTrwale: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    IdPracownik: {
      type: DataTypes.INTEGER(11),
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
      allowNull: true
    },
    Rodzaj: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    WartoscNetto: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    DataZakupu: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    tableName: 'srodki_trwale'
  });
};
