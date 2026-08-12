import { partidos, torneos, equipos, arbitros, nextPartidoId } from '../data/store.js';

const ESTADOS = ['programado', 'en_juego', 'finalizado'];

const buscarPartido = (id) => partidos.find((partido) => partido.id === Number(id));
const existe = (coleccion, id) => coleccion.some((item) => item.id === Number(id));
const esSetValido = (valor) => Number.isInteger(valor) && valor >= 0;

const validar = ({ torneo_id, equipo_local_id, equipo_visitante_id, arbitro_id, estado, sets_local, sets_visitante }) => {
  if (torneo_id !== undefined && !existe(torneos, torneo_id)) return 'torneo_id no existe';
  if (equipo_local_id !== undefined && !existe(equipos, equipo_local_id)) return 'equipo_local_id no existe';
  if (equipo_visitante_id !== undefined && !existe(equipos, equipo_visitante_id)) return 'equipo_visitante_id no existe';
  if (arbitro_id !== undefined && arbitro_id !== null && !existe(arbitros, arbitro_id)) return 'arbitro_id no existe';
  if (estado !== undefined && !ESTADOS.includes(estado)) return `estado debe ser uno de: ${ESTADOS.join(', ')}`;
  if (sets_local !== undefined && !esSetValido(sets_local)) return 'sets_local debe ser un entero mayor o igual a 0';
  if (sets_visitante !== undefined && !esSetValido(sets_visitante)) return 'sets_visitante debe ser un entero mayor o igual a 0';
  return null;
};

export const crear = async (req, res, next) => {
  try {
    const {
      torneo_id,
      equipo_local_id,
      equipo_visitante_id,
      arbitro_id,
      fecha,
      estado,
      sets_local,
      sets_visitante,
    } = req.body;

    if (!torneo_id || !equipo_local_id || !equipo_visitante_id) {
      return res.status(400).json({ error: 'torneo_id, equipo_local_id y equipo_visitante_id son requeridos' });
    }
    if (Number(equipo_local_id) === Number(equipo_visitante_id)) {
      return res.status(400).json({ error: 'equipo_local_id y equipo_visitante_id deben ser diferentes' });
    }

    const error = validar(req.body);
    if (error) return res.status(400).json({ error });

    const partido = {
      id: nextPartidoId(),
      torneo_id: Number(torneo_id),
      equipo_local_id: Number(equipo_local_id),
      equipo_visitante_id: Number(equipo_visitante_id),
      arbitro_id: arbitro_id ? Number(arbitro_id) : null,
      fecha: fecha ?? null,
      estado: estado ?? 'programado',
      sets_local: sets_local ?? 0,
      sets_visitante: sets_visitante ?? 0,
    };
    partidos.push(partido);
    res.status(201).json(partido);
  } catch (err) {
    next(err);
  }
};

export const listar = async (req, res, next) => {
  try {
    const { torneo_id, estado } = req.query;
    let resultado = partidos;
    if (torneo_id) resultado = resultado.filter((partido) => partido.torneo_id === Number(torneo_id));
    if (estado) resultado = resultado.filter((partido) => partido.estado === estado);
    res.json(resultado);
  } catch (err) {
    next(err);
  }
};

export const obtener = async (req, res, next) => {
  try {
    const partido = buscarPartido(req.params.id);
    if (!partido) return res.status(404).json({ error: 'Partido no encontrado' });
    res.json(partido);
  } catch (err) {
    next(err);
  }
};

export const actualizar = async (req, res, next) => {
  try {
    const partido = buscarPartido(req.params.id);
    if (!partido) return res.status(404).json({ error: 'Partido no encontrado' });

    const {
      torneo_id,
      equipo_local_id,
      equipo_visitante_id,
      arbitro_id,
      fecha,
      estado,
      sets_local,
      sets_visitante,
    } = req.body;

    const local = equipo_local_id ?? partido.equipo_local_id;
    const visitante = equipo_visitante_id ?? partido.equipo_visitante_id;
    if (Number(local) === Number(visitante)) {
      return res.status(400).json({ error: 'equipo_local_id y equipo_visitante_id deben ser diferentes' });
    }

    const error = validar(req.body);
    if (error) return res.status(400).json({ error });

    partido.torneo_id = torneo_id ? Number(torneo_id) : partido.torneo_id;
    partido.equipo_local_id = Number(local);
    partido.equipo_visitante_id = Number(visitante);
    partido.arbitro_id = arbitro_id !== undefined ? (arbitro_id ? Number(arbitro_id) : null) : partido.arbitro_id;
    partido.fecha = fecha ?? partido.fecha;
    partido.estado = estado ?? partido.estado;
    partido.sets_local = sets_local ?? partido.sets_local;
    partido.sets_visitante = sets_visitante ?? partido.sets_visitante;
    res.json(partido);
  } catch (err) {
    next(err);
  }
};

export const eliminar = async (req, res, next) => {
  try {
    const indice = partidos.findIndex((partido) => partido.id === Number(req.params.id));
    if (indice === -1) return res.status(404).json({ error: 'Partido no encontrado' });
    partidos.splice(indice, 1);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
