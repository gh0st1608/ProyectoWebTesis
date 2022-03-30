import { Request, Response } from "express";
import UserModel from "../models/User.model";
import CrudRepository from "../shared/repository/CrudRepository";
import UserRepository from "../shared/repository/UserRepository";
import { encrypt } from "../shared/utils/crypt";

class UserController implements CrudRepository {
	constructor(){}

	public async getAll(_: Request, res: Response): Promise<void> {
		try {
			const users = await UserModel.find();
			res.send({users, message: 'Lista de usuarios obtenida', success: true});
			return
		} catch (error) {
			res.send({error, message: 'Ha ocurrido un problema', success: false});
		}
	}

	public async getById(req: Request, res: Response): Promise<void> {
		try {
			const { _id } = req.params;
			const user = await UserModel.findById(_id);
			if(!user){
				res.send({message: 'Usuario no encontrado', success:false}).status(404);
				return;
			}
			res.send({message: 'Usuaario encontrado', user, success:true});
		} catch (error) {
			res.send({error, message: 'Ha ocurrido un problema', success: false});
		}
	}

	public async create(req: Request, res: Response): Promise<void> {
		try {
			const user = req.body as UserRepository;
			user.password = encrypt(user.password);
			const role =  user.role === 'admin' ? user.role : 'user';
			const userDb = new UserModel({...user, role});
			await userDb.save();
			
			res.send({userDb, message: 'Usuario creado correctamente'})	
		} catch (error) {
			res.send({error, message: 'Problemas al crear el usuario'})
		}
	}

	public async update(req: Request, res: Response): Promise<void> {
		try {
			const { _id, ...body} = req.body;
			if(!_id){
				res.send({error: {code: 1, message: 'falta parametros'}, message:'La propiedad id es obligatoria', success: false});
			}
			if(body.password){
				body.password = encrypt(body.password);
			}
			const userFinded = await UserModel.findByIdAndUpdate(_id, {...body}, {
				returnDocument: 'after'
			}) //...body => {name: 'actualizada'}
			res.send({user: userFinded, message: 'actualizado correctamente', success: true});
		} catch (error) {
			res.send({error, message: 'Problemas al actualizar el usuario'})

		}
	}

	public async delete(req: Request, res: Response) {
		try {
			const { _id } = req.params;
			if(!_id){
				res.send({error: {code: 1, message: 'falta parametros'}, message:'La propiedad id es obligatoria', success: false});
			}
			await UserModel.deleteOne({_id});
			res.send({message: 'Usuario eliminado correctamente', success: true});
		} catch (error) {
			res.send({error, message: 'Problemas al eliminar el usuario'})
		}
	}
}

export default UserController;