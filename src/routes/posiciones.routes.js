import { Router } from 'express';
import * as posicionesController from '../controllers/posiciones.controller.js';

const router = Router();

router.post('/', posicionesController.crear);
router.get('/', posicionesController.listar);
router.get('/:id', posicionesController.obtener);
router.put('/:id', posicionesController.actualizar);
router.delete('/:id', posicionesController.eliminar);

export default router;
