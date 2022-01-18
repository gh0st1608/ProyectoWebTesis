import { Router } from 'express';
import TestController from '../controllers/test.controller';

const router = Router();
const testController = new TestController();

router.get('/', testController.getAll);
//router.get('/', testController.getOne);
router.post('/', testController.create);
router.patch('/', testController.update);
router.delete('/', testController.update);

export default router;
