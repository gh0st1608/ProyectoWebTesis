import { Response, Request } from 'express';
import UserModel from '../models/User.model';
import { compareSync } from '../shared/utils/crypt';
import generateJWT from '../shared/utils/generateJWT.util';
import jwt from 'jsonwebtoken';
class AuthController {
	
	public async login(req: Request, res: Response){
		try {
			const { email, password } = req.body;
			const user = await UserModel.findOne( {email} ); // SQL -> SELECT * FROM usuarios where email = "ejemplo@mail.com"
			if( !user ){
				return res.send({message: 'Usuario no encontado', error: { code: 'ER001', message: 'El usuario no existe'}}).status(404);
			}
	//EX      HASH        , 12345678
			const validPassword = compareSync(user.password, password);
			if(!validPassword){
				return res.send({message: 'Usuario o contraseña incorrectos', error: { code: 'ER002', message: 'Las credenciales son erroneas'}}).status(401);
			}
			const token = await generateJWT(user._id, email);
			setTimeout(() => {
				return res.send({message: 'Usuario loggeado correctamente', token});
			}, 1500)
		} catch (error) {
			res.send({message: 'Ha ocurrido un error en el servidor', error}).status(500);
		}
	}

	public async renewToken(req: Request, res: Response){
		try {
			const oldToken = req.headers.authorization;
			const { uid, email }: any = jwt.decode(oldToken!) ;
			const token = await generateJWT(uid, email);
			res.send({message: 'El token ha sido renovado', code: 'T001', token, uid})
		} catch (error) {
			res.send({message: 'Ha ocurrido un error en el servidor', error}).status(500);
		}
	}
}

export default AuthController;