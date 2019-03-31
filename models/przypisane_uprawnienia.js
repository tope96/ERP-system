/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('przypisane_uprawnienia', {
    IdKontoDomenowe: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'konta_domenowe',
        key: 'IdKontoDomenowe'
      }
    },
    IdUprawnienie: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'uprawnienia',
        key: 'IdUprawnienie'
      }
    }
  }, {
    tableName: 'przypisane_uprawnienia'
  });
};
