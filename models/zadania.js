/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('zadania', {
    IdZadanie: {
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
    IdProjekt: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'projekty',
        key: 'IdProjekt'
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
    Status: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    Priorytet: {
      type: DataTypes.STRING(25),
      allowNull: true
    }
  }, {
    tableName: 'zadania'
  });
};
