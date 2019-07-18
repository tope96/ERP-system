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
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Opis: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    Status: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    IdKontoDomenowe: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    DataRealizacji: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    Priorytet: {
      type: DataTypes.INTEGER(211),
      allowNull: true
    }
  }, {
    tableName: 'zadania',
    timestamps: false
  });
};
