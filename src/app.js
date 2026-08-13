import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import equiposRouter from './routes/equipos.routes.js';
import jugadoresRouter from './routes/jugadores.routes.js';
import posicionesRouter from './routes/posiciones.routes.js';
import arbitrosRouter from './routes/arbitros.routes.js';
import torneosRouter from './routes/torneos.routes.js';
import partidosRouter from './routes/partidos.routes.js';
import corporateRouter from './routes/corporate.routes.js';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/equipos', equiposRouter);
app.use('/api/jugadores', jugadoresRouter);
app.use('/api/posiciones', posicionesRouter);
app.use('/api/arbitros', arbitrosRouter);
app.use('/api/torneos', torneosRouter);
app.use('/api/partidos', partidosRouter);
app.use('/api/corporate', corporateRouter);

app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Error interno del servidor' });
});

export default app;
