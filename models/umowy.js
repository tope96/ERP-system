/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('umowy', {
    IdUmowy: {
      type: DataTypes.INTEGER(10),
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
    StawkaGodzinowa: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    umowy_b2b: {
      type: DataTypes.DECIMAL(7,2),
      allowNull: true,
      references: {
        model: 'umowy_b2b',
        key: 'IdUmowy'
      }
    },
    umowy_o_prace: {
      type: DataTypes.DECIMAL(7,2),
      allowNull: true,
      references: {
        model: 'umowy_o_prace',
        key: 'IdUmowy'
      }
    },
    umowy_zlecenie: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      references: {
        model: 'umowy_zlecenie',
        key: 'IdUmowy'
      }
    }
  }, {
    tableName: 'umowy',
    timestamps: false
  });
};
