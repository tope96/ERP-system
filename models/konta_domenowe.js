/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('konta_domenowe', {
    IdKontoDomenowe: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    IdPracownik: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'pracownicy',
        key: 'IdPracownik'
      }
    },
    Opis: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    KontoAktywne: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    },
    Login: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    Haslo: {
      type: DataTypes.STRING(150),
      allowNull: false
    }
  }, {
    tableName: 'konta_domenowe'
  });
};
