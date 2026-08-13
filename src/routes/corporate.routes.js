import {Router} from 'express';
import * as corporateController from '../controllers/corporate.controller.js';

const router = Router();

router.get('/', corporateController.getCorporate);

export default router;