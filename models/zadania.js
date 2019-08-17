/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('zadania', {
    IdZadanie: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    IdPracownik: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      references: {
        model: 'pracownicy',
        key: 'IdPracownik'
      }
    },
    IdProjekt: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: 'projekty',
        key: 'IdProjekt'
      }
    },
    Nazwa: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Opis: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: 'NULL'
    },
    Status: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'status',
        key: 'IdStatus'
      }
    },
    Priorytet: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'priorytet',
        key: 'IdPriorytet'
      }
    },
    IdKontoDomenowe: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'konta_domenowe',
        key: 'IdKontoDomenowe'
      }
    },
    DataRealizacji: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    tableName: 'zadania',
    timestamps: false
  });
};
