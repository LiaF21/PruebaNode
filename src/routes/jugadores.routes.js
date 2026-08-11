import { Router } from 'express';
import * as jugadoresController from '../controllers/jugadores.controller.js';

const router = Router();

router.post('/', jugadoresController.crear);
router.get('/', jugadoresController.listar);
router.get('/:id', jugadoresController.obtener);
router.put('/:id', jugadoresController.actualizar);
router.delete('/:id', jugadoresController.eliminar);

export default router;
