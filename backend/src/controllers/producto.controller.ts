import { Request, Response } from "express";
import ProductoModel from "../models/producto.model";
import CrudRepository from "../shareds/repositories/crud.repository";
import ProductoRepository from "../shareds/repositories/producto.repository";
class ProductoController implements CrudRepository {
	constructor(){}
	public async getAll(_: Request, res: Response): Promise<void> {
		try {
			const productos = await ProductoModel.find();
			res.send({productos, message: 'Lista de productos obtenida', success: true});
			return
		} catch (error) {
			res.send({error, message: 'Ha ocurrido un problema', success: false});
		}
	}
	public async getOne(req: Request, res: Response): Promise<void> {
		try {
			const { _id} = req.params;
			const producto = await ProductoModel.findById(_id);
            if(!producto){
                res.send({producto, message: 'Producto no encontrado', success: true});
                return
            }
			res.send({producto, message: 'Producto obtenido', success: true});
			return
		} catch (error) {
			res.send({error, message: 'Ha ocurrido un problema', success: false});
		}
	}
	public async create(req: Request, res: Response): Promise<void> {
		try {
			const producto = req.body as ProductoRepository;
			const productoCreado = new ProductoModel(producto);
			await productoCreado.save();
			res.send({productoCreado, message: 'Producto creado correctamente'})	
		} catch (error) {
			res.send({error, message: 'Problemas al crear el producto'})
		}
	}
	public async update(req: Request, res: Response): Promise<void> {
		try {
			const { _id, ...body} = req.body;
			if(!_id){
				res.send({error: {code: 1, message: 'falta parametros'}, message:'La propiedad id es obligatoria', success: false});
			}
			const productoActualizado = await ProductoModel.findByIdAndUpdate(_id, {...body}, {
				returnDocument: 'after'
			}) //...body => {name: 'actualizada'}
			res.send({producto: productoActualizado, message: 'actualizado correctamente', success: true});
		} catch (error) {
			res.send({error, message: 'Problemas al actualizar el producto'})
		}
	}
	public async delete(req: Request, res: Response): Promise<void> {
		try {
			const {_id} = req.params;
			if(!_id){
				res.send({error: {code: 1, message: 'falta parametros'}, message:'La propiedad id es obligatoria', success: false});
			}
			await ProductoModel.deleteOne({_id})
			res.send({message: 'Producto borrado correctamente', success: true});
		} catch (error) {
			console.log(error)
			res.send({error, message: 'Problemas al borrar el producto'})
		}
	}
}
export default ProductoController;