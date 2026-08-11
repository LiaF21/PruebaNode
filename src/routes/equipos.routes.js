import { Router } from 'express';
import * as equiposController from '../controllers/equipos.controller.js';

const router = Router();

router.post('/', equiposController.crear);
router.get('/', equiposController.listar);
router.get('/:id', equiposController.obtener);
router.put('/:id', equiposController.actualizar);
router.delete('/:id', equiposController.eliminar);

export default router;
