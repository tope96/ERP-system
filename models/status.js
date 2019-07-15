/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('status', {
      IdStatus: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      Nazwa: {
        type: DataTypes.STRING(125),
        allowNull: false
      }
    }, {
      tableName: 'status',
      timestamps: false
    });
  };
  