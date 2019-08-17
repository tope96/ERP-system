/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('wnioski', {
    IdWniosek: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    IdPracownik: {
      type: DataTypes.INTEGER(10),
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
      allowNull: true,
      defaultValue: 'NULL'
    },
    ArgumentacjaWniosku: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    KategoriaWniosku: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'kategoria_wniosku',
        key: 'IdKategoriaWniosku'
      }
    },
    DataWyslania: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    ZespolDomenowy: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'zespolydomenowe',
        key: 'IdZespolyDomenowe'
      }
    },
    Status: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '3',
      references: {
        model: 'status_wniosku',
        key: 'IdStatusWniosku'
      }
    }
  }, {
    tableName: 'wnioski',
    timestamps: false
  });
};
