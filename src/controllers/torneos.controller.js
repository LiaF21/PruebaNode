import { torneos, partidos, nextTorneoId } from '../data/store.js';

const ESTADOS = ['programado', 'en_curso', 'finalizado'];

const buscarTorneo = (id) => torneos.find((torneo) => torneo.id === Number(id));

export const crear = async (req, res, next) => {
  try {
    const { nombre, categoria, sede, fecha_inicio, fecha_fin, estado } = req.body;
    if (!nombre) return res.status(400).json({ error: 'nombre es requerido' });
    if (estado !== undefined && !ESTADOS.includes(estado)) {
      return res.status(400).json({ error: `estado debe ser uno de: ${ESTADOS.join(', ')}` });
    }

    const torneo = {
      id: nextTorneoId(),
      nombre,
      categoria: categoria ?? null,
      sede: sede ?? null,
      fecha_inicio: fecha_inicio ?? null,
      fecha_fin: fecha_fin ?? null,
      estado: estado ?? 'programado',
    };
    torneos.push(torneo);
    res.status(201).json(torneo);
  } catch (err) {
    next(err);
  }
};

export const listar = async (req, res, next) => {
  try {
    const { estado } = req.query;
    if (!estado) return res.json(torneos);
    res.json(torneos.filter((torneo) => torneo.estado === estado));
  } catch (err) {
    next(err);
  }
};

export const obtener = async (req, res, next) => {
  try {
    const torneo = buscarTorneo(req.params.id);
    if (!torneo) return res.status(404).json({ error: 'Torneo no encontrado' });
    res.json(torneo);
  } catch (err) {
    next(err);
  }
};

export const actualizar = async (req, res, next) => {
  try {
    const torneo = buscarTorneo(req.params.id);
    if (!torneo) return res.status(404).json({ error: 'Torneo no encontrado' });

    const { nombre, categoria, sede, fecha_inicio, fecha_fin, estado } = req.body;
    if (nombre !== undefined && !nombre) {
      return res.status(400).json({ error: 'nombre no puede estar vacio' });
    }
    if (estado !== undefined && !ESTADOS.includes(estado)) {
      return res.status(400).json({ error: `estado debe ser uno de: ${ESTADOS.join(', ')}` });
    }

    torneo.nombre = nombre ?? torneo.nombre;
    torneo.categoria = categoria ?? torneo.categoria;
    torneo.sede = sede ?? torneo.sede;
    torneo.fecha_inicio = fecha_inicio ?? torneo.fecha_inicio;
    torneo.fecha_fin = fecha_fin ?? torneo.fecha_fin;
    torneo.estado = estado ?? torneo.estado;
    res.json(torneo);
  } catch (err) {
    next(err);
  }
};

export const eliminar = async (req, res, next) => {
  try {
    const indice = torneos.findIndex((torneo) => torneo.id === Number(req.params.id));
    if (indice === -1) return res.status(404).json({ error: 'Torneo no encontrado' });

    const tienePartidos = partidos.some((partido) => partido.torneo_id === Number(req.params.id));
    if (tienePartidos) {
      return res.status(409).json({ error: 'No se puede eliminar el torneo porque tiene partidos asociados' });
    }

    torneos.splice(indice, 1);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
