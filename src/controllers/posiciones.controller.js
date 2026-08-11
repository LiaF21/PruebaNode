import { Posicion } from '../models/index.js';

export const crear = async (req, res, next) => {
  try {
    const { nombre } = req.body;
    if (!nombre) return res.status(400).json({ error: 'nombre es requerido' });
    const posicion = await Posicion.create({ nombre });
    res.status(201).json(posicion);
  } catch (err) {
    next(err);
  }
};

export const listar = async (req, res, next) => {
  try {
    const posiciones = await Posicion.findAll();
    res.json(posiciones);
  } catch (err) {
    next(err);
  }
};

export const obtener = async (req, res, next) => {
  try {
    const posicion = await Posicion.findByPk(req.params.id);
    if (!posicion) return res.status(404).json({ error: 'Posicion no encontrada' });
    res.json(posicion);
  } catch (err) {
    next(err);
  }
};

export const actualizar = async (req, res, next) => {
  try {
    const posicion = await Posicion.findByPk(req.params.id);
    if (!posicion) return res.status(404).json({ error: 'Posicion no encontrada' });
    const { nombre } = req.body;
    await posicion.update({ nombre });
    res.json(posicion);
  } catch (err) {
    next(err);
  }
};

export const eliminar = async (req, res, next) => {
  try {
    const posicion = await Posicion.findByPk(req.params.id);
    if (!posicion) return res.status(404).json({ error: 'Posicion no encontrada' });
    await posicion.destroy();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
