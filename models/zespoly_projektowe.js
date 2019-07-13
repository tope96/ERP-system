/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('zespoly_projektowe', {
    IdProjekt: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'projekty',
        key: 'IdProjekt'
      }
    },
    IdZespol: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'zespoly',
        key: 'IdZespol'
      }
    },
  }, {
    tableName: 'zespoly_projektowe',
    timestamps: false
  });
};
