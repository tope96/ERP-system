/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('umowy_zlecenie', {
    IdUmowy: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    StatusStudenta: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    },
    ZUS: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    }
  }, {
    tableName: 'umowy_zlecenie'
  });
};
