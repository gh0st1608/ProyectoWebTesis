// PATH : api/users
import { Router } from 'express';
import UserController from '../controllers/user.controller';

const router = Router();
const userController = new UserController();

router.get('/', userController.getAll);
router.get('/:_id', userController.getById);
router.post('/', userController.create);
router.patch('/', userController.update);
router.delete('/:_id', userController.delete);
export default router;