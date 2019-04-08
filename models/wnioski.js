/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('wnioski', {
    IdWniosek: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    IdPracownik: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
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
    ArgumentacjaWniosku: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    KategoriaWniosku: {
      type: DataTypes.STRING(25),
      allowNull: true
    }
  }, {
    tableName: 'wnioski'
  });
};