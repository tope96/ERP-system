/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('firma', {
    IdFirma: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    Nazwa: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    Nip: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: 'NULL'
    },
    IdMiasto: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      references: {
        model: 'miasto',
        key: 'IdMiasto'
      }
    },
    Adres: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: 'NULL'
    },
    IdZespol: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      references: {
        model: 'zespolydomenowe',
        key: 'IdZespolyDomenowe'
      }
    }
  }, {
    tableName: 'firma',
    timestamps: false
  });
};
