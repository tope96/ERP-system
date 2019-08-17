/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('konta_domenowe', {
    IdKontoDomenowe: {
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
    Opis: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: 'NULL'
    },
    KontoAktywne: {
      type: DataTypes.INTEGER(3),
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
    },
    IdZespol: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      references: {
        model: 'zespolydomenowe',
        key: 'IdZespolyDomenowe'
      }
    },
    IdUprawnienia: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'uprawnienia',
        key: 'IdUprawnienie'
      }
    }
  }, {
    tableName: 'konta_domenowe',
    timestamps: false
  });
};
