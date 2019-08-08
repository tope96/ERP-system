/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('konta_pocztowe', {
    IdKontoPocztowe: {
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
    AdresPocztowy: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    ZespolDomenowy: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    AliasPocztowy: {
      type: DataTypes.STRING(30),
      allowNull: false
    }
  }, {
    tableName: 'konta_pocztowe',
    timestamps: false
  });
};
