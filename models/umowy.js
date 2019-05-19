/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('umowy', {
    IdUmowy: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    DataRozpoczecia: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    DataZakonczenia: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    StawkaRyczalt: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    umowy_b2b: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    umowy_o_prace: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    umowy_zlecenie: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    StawkaGodzinowa: {
      type: DataTypes.FLOAT,
      allowNull: true
    }
  }, {
    tableName: 'umowy',
    timestamps: false
  });
};
