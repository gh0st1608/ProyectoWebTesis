// path: api/auth
import { Router } from "express";
import AuthController from "../controllers/auth.controller";

const route = Router();
const authController = new AuthController();
// api/auth/
route.post('/',  authController.login);
route.post('/renew', authController.renewToken);

export default route;