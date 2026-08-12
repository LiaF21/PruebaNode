import { equipos, jugadores, posiciones, nextEquipoId } from "../data/store.js";

const conJugadores = (equipo) => ({
  ...equipo,
  jugadores: jugadores
    .filter((j) => j.equipo_id === equipo.id)
    .map((j) => ({
      ...j,
      posicion: posiciones.find((p) => p.id === j.posicion_id) || null,
    })),
});

export const crear = (req, res) => {
  const { nombre, categoria } = req.body;
  if (!nombre) return res.status(400).json({ error: "nombre es requerido" });
  const equipo = { id: nextEquipoId(), nombre, categoria: categoria || null };
  equipos.push(equipo);
  res.status(201).json(equipo);
};

export const listar = (req, res) => {
  res.json(equipos.map(conJugadores));
};

export const obtener = (req, res) => {
  const equipo = equipos.find((e) => e.id === Number(req.params.id));
  if (!equipo)
    return res.status(404).json({ error: "no se encontro el equipo" });
  res.json(conJugadores(equipo));
};

export const actualizar = (req, res) => {
  const equipo = equipos.find((e) => e.id === Number(req.params.id));
  if (!equipo)
    return res.status(404).json({ error: "no se encontro el equipo" });
  const { nombre, categoria } = req.body;
  if (nombre !== undefined) equipo.nombre = nombre;
  if (categoria !== undefined) equipo.categoria = categoria;
  res.json(equipo);
};

export const eliminar = (req, res) => {
  const id = Number(req.params.id);
  const index = equipos.findIndex((e) => e.id === id);
  if (index === -1)
    return res.status(404).json({ error: "no se encontro el equipo" });
  equipos.splice(index, 1);
  for (let i = jugadores.length - 1; i >= 0; i--) {
    if (jugadores[i].equipo_id === id) jugadores.splice(i, 1);
  }
  res.status(204).send();
};
