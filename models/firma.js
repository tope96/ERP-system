/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('firma', {
    IdFirma: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    Nazwa: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    Nip: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    IdMiasto: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    Adres: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    tableName: 'firma'
  });
};
