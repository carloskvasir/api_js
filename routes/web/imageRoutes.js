import { Router } from 'express';
import * as imageController from '../../controllers/web/imageController.js';

const router = Router();

router.get('/', imageController.index);
router.get('/new', imageController.create);
router.post('/', imageController.store);
router.get('/:id', imageController.show);
router.get('/:id/edit', imageController.edit);
router.post('/:id/edit', imageController.update);
router.post('/:id/delete', imageController.destroy);

export default router;
