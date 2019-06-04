/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('zespoly', {
    IdZespol: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    Nazwa: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    zespolyDomenowe: {
      type: DataTypes.INTEGER(6),
      allowNull: false
    },
    ZrealizowanychZlecen: {
      type: DataTypes.INTEGER(6),
      allowNull: true
    }
  }, {
    tableName: 'zespoly',
    timestamps: false
  });
};
