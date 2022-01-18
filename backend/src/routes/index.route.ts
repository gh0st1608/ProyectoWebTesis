import { Router } from 'express';
import productoRoute from './producto.route';

const router = Router();

router.use('/productos', productoRoute);

export default router;
