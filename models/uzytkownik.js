/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('uzytkownik', {
    IdUzytkownik: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
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
      allowNull: true
    },
    Login: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    Haslo: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    Email: {
      type: DataTypes.STRING(25),
      allowNull: false
    }
  }, {
    tableName: 'uzytkownik',
    timestamps: false
  });
};
