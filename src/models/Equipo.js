import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Equipo = sequelize.define(
  'Equipo',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    categoria: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
  },
  {
    tableName: 'equipos',
  },
);

export default Equipo;
