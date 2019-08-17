/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('priorytet', {
    IdPriorytet: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    Nazwa: {
      type: DataTypes.STRING(25),
      allowNull: false
    }
  }, {
    tableName: 'priorytet',
    timestamps: false
  });
};
