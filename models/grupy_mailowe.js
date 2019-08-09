/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('grupy_mailowe', {
    IdGrupaMailowa: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    AdresPocztowy: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    Opis: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    ZespolDomenowy: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
  }, {
    tableName: 'grupy_mailowe',
    timestamps: false
  });
};
