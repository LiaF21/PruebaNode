import sequelize from '../config/db.js';
import Equipo from './Equipo.js';
import Jugador from './Jugador.js';
import Posicion from './Posicion.js';

Equipo.hasMany(Jugador, { foreignKey: 'equipo_id', as: 'jugadores' });
Jugador.belongsTo(Equipo, { foreignKey: 'equipo_id', as: 'equipo' });

Posicion.hasMany(Jugador, { foreignKey: 'posicion_id', as: 'jugadores' });
Jugador.belongsTo(Posicion, { foreignKey: 'posicion_id', as: 'posicion' });

export { sequelize, Equipo, Jugador, Posicion };
