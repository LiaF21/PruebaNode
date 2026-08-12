import { arbitros, nextArbitroId } from '../data/store.js';

const buscarArbitro = (id) => arbitros.find((arbitro) => arbitro.id === Number(id));

export const crear = async (req, res, next) => {
  try {
    const { nombre, licencia, categoria } = req.body;
    if (!nombre) return res.status(400).json({ error: 'nombre es requerido' });

    const arbitro = {
      id: nextArbitroId(),
      nombre,
      licencia: licencia ?? null,
      categoria: categoria ?? null,
      activo: true,
    };
    arbitros.push(arbitro);
    res.status(201).json(arbitro);
  } catch (err) {
    next(err);
  }
};

export const listar = async (req, res, next) => {
  try {
    res.json(arbitros);
  } catch (err) {
    next(err);
  }
};

export const obtener = async (req, res, next) => {
  try {
    const arbitro = buscarArbitro(req.params.id);
    if (!arbitro) return res.status(404).json({ error: 'Arbitro no encontrado' });
    res.json(arbitro);
  } catch (err) {
    next(err);
  }
};

export const actualizar = async (req, res, next) => {
  try {
    const arbitro = buscarArbitro(req.params.id);
    if (!arbitro) return res.status(404).json({ error: 'Arbitro no encontrado' });

    const { nombre, licencia, categoria, activo } = req.body;
    if (nombre !== undefined && !nombre) {
      return res.status(400).json({ error: 'nombre no puede estar vacio' });
    }

    arbitro.nombre = nombre ?? arbitro.nombre;
    arbitro.licencia = licencia ?? arbitro.licencia;
    arbitro.categoria = categoria ?? arbitro.categoria;
    arbitro.activo = activo ?? arbitro.activo;
    res.json(arbitro);
  } catch (err) {
    next(err);
  }
};

export const eliminar = async (req, res, next) => {
  try {
    const indice = arbitros.findIndex((arbitro) => arbitro.id === Number(req.params.id));
    if (indice === -1) return res.status(404).json({ error: 'Arbitro no encontrado' });
    arbitros.splice(indice, 1);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
