import { Router } from 'express';
import * as torneosController from '../controllers/torneos.controller.js';

const router = Router();

router.post('/', torneosController.crear);
router.get('/', torneosController.listar);
router.get('/:id', torneosController.obtener);
router.put('/:id', torneosController.actualizar);
router.delete('/:id', torneosController.eliminar);

export default router;
