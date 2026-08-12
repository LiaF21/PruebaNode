// "Base de datos" en memoria usando arreglos. Los datos se pierden al reiniciar el servidor.

export const posiciones = [
  { id: 1, nombre: 'Colocador' },
  { id: 2, nombre: 'Opuesto' },
  { id: 3, nombre: 'Central' },
  { id: 4, nombre: 'Receptor-Punta' },
  { id: 5, nombre: 'Líbero' },
];

export const equipos = [];
export const jugadores = [];
export const arbitros = [];
export const torneos = [];
export const partidos = [];

let equipoIdCounter = 1;
let jugadorIdCounter = 1;
let posicionIdCounter = posiciones.length + 1;
let arbitroIdCounter = 1;
let torneoIdCounter = 1;
let partidoIdCounter = 1;

export const nextEquipoId = () => equipoIdCounter++;
export const nextJugadorId = () => jugadorIdCounter++;
export const nextPosicionId = () => posicionIdCounter++;
export const nextArbitroId = () => arbitroIdCounter++;
export const nextTorneoId = () => torneoIdCounter++;
export const nextPartidoId = () => partidoIdCounter++;

export const esLibero = (posicion) => {
  if (!posicion) return false;
  const nombre = posicion.nombre.toLowerCase();
  return nombre.includes('libero') || nombre.includes('líbero');
};
