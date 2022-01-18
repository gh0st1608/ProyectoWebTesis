import { Router } from 'express';
import ProductoController from '../controllers/producto.controller';

const router = Router();
const productoController = new ProductoController();

router.get('/', productoController.getAll);
router.get('/:_id', productoController.getOne);
router.post('/', productoController.create);
router.patch('/', productoController.update);
router.delete('/:_id', productoController.delete);

export default router;
