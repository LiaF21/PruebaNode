import { Router } from 'express';
import * as arbitrosController from '../controllers/arbitros.controller.js';

const router = Router();

router.post('/', arbitrosController.crear);
router.get('/', arbitrosController.listar);
router.get('/:id', arbitrosController.obtener);
router.put('/:id', arbitrosController.actualizar);
router.delete('/:id', arbitrosController.eliminar);

export default router;
