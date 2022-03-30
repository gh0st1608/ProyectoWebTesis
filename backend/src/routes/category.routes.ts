import { Router } from 'express';
import { check } from 'express-validator';
import CategoryController from '../controllers/category.controller';
import fieldValidator from '../middlewares/fieldValidator.middleware';
const router = Router();
const categoryController = new CategoryController();

router.get('/', categoryController.getAll);
router.post('/', [
	check('name', 'El campo name es requerido').notEmpty(),
	fieldValidator
], categoryController.create)

export default router;