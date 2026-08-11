import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Posicion = sequelize.define(
  'Posicion',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: 'posiciones',
    timestamps: false,
  },
);

export default Posicion;
