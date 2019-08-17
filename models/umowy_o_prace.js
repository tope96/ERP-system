/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('umowy_o_prace', {
    IdUmowy: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    WymiarCzasuPracy: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    }
  }, {
    tableName: 'umowy_o_prace',
    timestamps: false
  });
};
