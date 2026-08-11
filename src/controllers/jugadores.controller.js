import { Jugador, Equipo, Posicion } from '../models/index.js';

export const crear = async (req, res, next) => {
  try {
    const { nombre, numero, equipo_id, posicion_id } = req.body;
    if (!nombre || !numero || !equipo_id || !posicion_id) {
      return res.status(400).json({ error: 'nombre, numero, equipo_id y posicion_id son requeridos' });
    }
    const jugador = await Jugador.create({ nombre, numero, equipo_id, posicion_id });
    res.status(201).json(jugador);
  } catch (err) {
    next(err);
  }
};

export const listar = async (req, res, next) => {
  try {
    const jugadores = await Jugador.findAll({
      include: [
        { model: Equipo, as: 'equipo' },
        { model: Posicion, as: 'posicion' },
      ],
    });
    res.json(jugadores);
  } catch (err) {
    next(err);
  }
};

export const obtener = async (req, res, next) => {
  try {
    const jugador = await Jugador.findByPk(req.params.id, {
      include: [
        { model: Equipo, as: 'equipo' },
        { model: Posicion, as: 'posicion' },
      ],
    });
    if (!jugador) return res.status(404).json({ error: 'Jugador no encontrado' });
    res.json(jugador);
  } catch (err) {
    next(err);
  }
};

export const actualizar = async (req, res, next) => {
  try {
    const jugador = await Jugador.findByPk(req.params.id);
    if (!jugador) return res.status(404).json({ error: 'Jugador no encontrado' });
    const { nombre, numero, equipo_id, posicion_id } = req.body;
    await jugador.update({ nombre, numero, equipo_id, posicion_id });
    res.json(jugador);
  } catch (err) {
    next(err);
  }
};

export const eliminar = async (req, res, next) => {
  try {
    const jugador = await Jugador.findByPk(req.params.id);
    if (!jugador) return res.status(404).json({ error: 'Jugador no encontrado' });
    await jugador.destroy();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
