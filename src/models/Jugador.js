import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Jugador = sequelize.define(
  'Jugador',
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
    numero: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'jugadores',
  },
);

export default Jugador;
