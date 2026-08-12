import { jugadores, equipos, posiciones, nextJugadorId, esLibero } from '../data/store.js';

const MAX_JUGADORES_POR_EQUIPO = 14;
const MAX_LIBEROS_POR_EQUIPO = 2;

const conRelaciones = (jugador) => ({
  ...jugador,
  equipo: equipos.find((e) => e.id === jugador.equipo_id) || null,
  posicion: posiciones.find((p) => p.id === jugador.posicion_id) || null,
});

export const crear = (req, res) => {
  const { nombre, numero, equipo_id, posicion_id, capitan } = req.body;
  if (!nombre || !numero || !equipo_id || !posicion_id) {
    return res.status(400).json({ error: 'nombre, numero, equipo_id y posicion_id son requeridos' });
  }

  const equipo = equipos.find((e) => e.id === Number(equipo_id));
  if (!equipo) return res.status(400).json({ error: 'El equipo indicado no existe' });

  const posicion = posiciones.find((p) => p.id === Number(posicion_id));
  if (!posicion) return res.status(400).json({ error: 'La posicion indicada no existe' });

  const jugadoresDelEquipo = jugadores.filter((j) => j.equipo_id === equipo.id);

  if (jugadoresDelEquipo.length >= MAX_JUGADORES_POR_EQUIPO) {
    return res.status(400).json({ error: `El equipo ya alcanzo el maximo de ${MAX_JUGADORES_POR_EQUIPO} jugadores` });
  }

  if (jugadoresDelEquipo.some((j) => j.numero === Number(numero))) {
    return res.status(400).json({ error: `El numero ${numero} ya esta en uso en este equipo` });
  }

  if (esLibero(posicion)) {
    const liberosActuales = jugadoresDelEquipo.filter((j) =>
      esLibero(posiciones.find((p) => p.id === j.posicion_id)),
    );
    if (liberosActuales.length >= MAX_LIBEROS_POR_EQUIPO) {
      return res.status(400).json({ error: `El equipo ya tiene el maximo de ${MAX_LIBEROS_POR_EQUIPO} liberos` });
    }
  }

  if (capitan && jugadoresDelEquipo.some((j) => j.capitan)) {
    return res.status(400).json({ error: 'El equipo ya tiene un capitan' });
  }

  const jugador = {
    id: nextJugadorId(),
    nombre,
    numero: Number(numero),
    equipo_id: equipo.id,
    posicion_id: posicion.id,
    capitan: Boolean(capitan),
  };
  jugadores.push(jugador);
  res.status(201).json(conRelaciones(jugador));
};

export const listar = (req, res) => {
  res.json(jugadores.map(conRelaciones));
};

export const obtener = (req, res) => {
  const jugador = jugadores.find((j) => j.id === Number(req.params.id));
  if (!jugador) return res.status(404).json({ error: 'Jugador no encontrado' });
  res.json(conRelaciones(jugador));
};

export const actualizar = (req, res) => {
  const jugador = jugadores.find((j) => j.id === Number(req.params.id));
  if (!jugador) return res.status(404).json({ error: 'Jugador no encontrado' });

  const { nombre, numero, equipo_id, posicion_id, capitan } = req.body;

  const equipoDestinoId = equipo_id !== undefined ? Number(equipo_id) : jugador.equipo_id;
  if (equipo_id !== undefined && !equipos.some((e) => e.id === equipoDestinoId)) {
    return res.status(400).json({ error: 'El equipo indicado no existe' });
  }

  const posicionDestinoId = posicion_id !== undefined ? Number(posicion_id) : jugador.posicion_id;
  const posicionDestino = posiciones.find((p) => p.id === posicionDestinoId);
  if (posicion_id !== undefined && !posicionDestino) {
    return res.status(400).json({ error: 'La posicion indicada no existe' });
  }

  const numeroDestino = numero !== undefined ? Number(numero) : jugador.numero;
  const numeroEnUso = jugadores.some(
    (j) => j.id !== jugador.id && j.equipo_id === equipoDestinoId && j.numero === numeroDestino,
  );
  if (numeroEnUso) {
    return res.status(400).json({ error: `El numero ${numeroDestino} ya esta en uso en este equipo` });
  }

  if (esLibero(posicionDestino)) {
    const liberosActuales = jugadores.filter(
      (j) => j.id !== jugador.id && j.equipo_id === equipoDestinoId && esLibero(posiciones.find((p) => p.id === j.posicion_id)),
    );
    if (liberosActuales.length >= MAX_LIBEROS_POR_EQUIPO) {
      return res.status(400).json({ error: `El equipo ya tiene el maximo de ${MAX_LIBEROS_POR_EQUIPO} liberos` });
    }
  }

  if (capitan) {
    const yaTieneCapitan = jugadores.some((j) => j.id !== jugador.id && j.equipo_id === equipoDestinoId && j.capitan);
    if (yaTieneCapitan) return res.status(400).json({ error: 'El equipo ya tiene un capitan' });
  }

  if (nombre !== undefined) jugador.nombre = nombre;
  if (numero !== undefined) jugador.numero = numeroDestino;
  if (equipo_id !== undefined) jugador.equipo_id = equipoDestinoId;
  if (posicion_id !== undefined) jugador.posicion_id = posicionDestinoId;
  if (capitan !== undefined) jugador.capitan = Boolean(capitan);

  res.json(conRelaciones(jugador));
};

export const eliminar = (req, res) => {
  const index = jugadores.findIndex((j) => j.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Jugador no encontrado' });
  jugadores.splice(index, 1);
  res.status(204).send();
};
