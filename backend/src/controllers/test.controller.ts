import { Request, Response } from "express";
import TestModel from "../models/test.model";
import CrudRepository from "../shareds/repositories/crud.repository";
import TestRepository from "../shareds/repositories/test.repository";
class TestController implements CrudRepository {
	constructor(){}
	public async getAll(_: Request, res: Response): Promise<void> {
		try {
			const tests = await TestModel.find();
			res.send({tests, message: 'Lista de tests obtenida', success: true});
			return
		} catch (error) {
			res.send({error, message: 'Ha ocurrido un problema', success: false});
		}
	}
	public async getOne(req: Request, res: Response): Promise<void> {
		try {
			const { _id, ...body} = req.body;
			const tests = await TestModel.findById(_id, {
				returnDocument: 'after'
			});
			res.send({tests, message: 'Lista de test obtenida', success: true});
			return
		} catch (error) {
			res.send({error, message: 'Ha ocurrido un problema', success: false});
		}
	}
	public async create(req: Request, res: Response): Promise<void> {
		try {
			const test = req.body as TestRepository;
			const testDb = new TestModel(test);
			await testDb.save();
			
			res.send({testDb, message: 'Test creado correctamente'})	
		} catch (error) {
			res.send({error, message: 'Problemas al crear el test'})
		}
	}
	public async update(req: Request, res: Response): Promise<void> {
		try {
			const { _id, ...body} = req.body;
			if(!_id){
				res.send({error: {code: 1, message: 'falta parametros'}, message:'La propiedad id es obligatoria', success: false});
			}
			const testFinded = await TestModel.findByIdAndUpdate(_id, {...body}, {
				returnDocument: 'after'
			}) //...body => {name: 'actualizada'}
			res.send({test: testFinded, message: 'actualizado correctamente', success: true});
		} catch (error) {
			res.send({error, message: 'Problemas al actualizar el usuario'})
		}
	}
	public async delete(req: Request, res: Response): Promise<void> {
		try {
			const { _id, ...body} = req.body;
			if(!_id){
				res.send({error: {code: 1, message: 'falta parametros'}, message:'La propiedad id es obligatoria', success: false});
			}
			const testDeleted = await TestModel.deleteOne(_id)
			res.send({test: testDeleted, message: 'borrado correctamente', success: true});
		} catch (error) {
			console.log(error)
			res.send({error, message: 'Problemas al borrar el test'})
		}
	}
}
export default TestController;