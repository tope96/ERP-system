/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('zespolydomenowe', {
    IdZespolyDomenowe: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    }
  }, {
    tableName: 'zespolydomenowe',
    timestamps: false
  });
};
