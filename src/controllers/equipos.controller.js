import { Equipo, Jugador, Posicion } from '../models/index.js';

export const crear = async (req, res, next) => {
  try {
    const { nombre, categoria } = req.body;
    if (!nombre) return res.status(400).json({ error: 'nombre es requerido' });
    const equipo = await Equipo.create({ nombre, categoria });
    res.status(201).json(equipo);
  } catch (err) {
    next(err);
  }
};

export const listar = async (req, res, next) => {
  try {
    const equipos = await Equipo.findAll({
      include: { model: Jugador, as: 'jugadores', include: { model: Posicion, as: 'posicion' } },
    });
    res.json(equipos);
  } catch (err) {
    next(err);
  }
};

export const obtener = async (req, res, next) => {
  try {
    const equipo = await Equipo.findByPk(req.params.id, {
      include: { model: Jugador, as: 'jugadores', include: { model: Posicion, as: 'posicion' } },
    });
    if (!equipo) return res.status(404).json({ error: 'Equipo no encontrado' });
    res.json(equipo);
  } catch (err) {
    next(err);
  }
};

export const actualizar = async (req, res, next) => {
  try {
    const equipo = await Equipo.findByPk(req.params.id);
    if (!equipo) return res.status(404).json({ error: 'Equipo no encontrado' });
    const { nombre, categoria } = req.body;
    await equipo.update({ nombre, categoria });
    res.json(equipo);
  } catch (err) {
    next(err);
  }
};

export const eliminar = async (req, res, next) => {
  try {
    const equipo = await Equipo.findByPk(req.params.id);
    if (!equipo) return res.status(404).json({ error: 'Equipo no encontrado' });
    await equipo.destroy();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
