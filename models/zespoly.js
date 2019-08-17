/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('zespoly', {
    IdZespol: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    Nazwa: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    ZrealizowanychZlecen: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    },
    zespolyDomenowe: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      references: {
        model: 'zespolydomenowe',
        key: 'IdZespolyDomenowe'
      }
    }
  }, {
    tableName: 'zespoly',
    timestamps: false
  });
};
