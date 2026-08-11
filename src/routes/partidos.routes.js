import { Router } from 'express';
import * as partidosController from '../controllers/partidos.controller.js';

const router = Router();

router.post('/', partidosController.crear);
router.get('/', partidosController.listar);
router.get('/:id', partidosController.obtener);
router.put('/:id', partidosController.actualizar);
router.delete('/:id', partidosController.eliminar);

export default router;
