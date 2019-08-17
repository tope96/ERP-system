/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('klienci', {
    IdKlient: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    Firma: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: 'firma',
        key: 'IdFirma'
      }
    },
    ImiePrzedstawiciela: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    NazwiskoPrzedstawiciela: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    NumerKontaktowy: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    EmailKontaktowy: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    zespolDomenowy: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: 'zespolydomenowe',
        key: 'IdZespolyDomenowe'
      }
    }
  }, {
    tableName: 'klienci',
    timestamps: false
  });
};
