export default interface TestRepository {
	_id?: string;
	nombre: string;
    categoria: string;
    caracteristicas: Object;
	descripcion_corto: string;
	descripcion_largo: string;
    precio:number;
    moneda:string;
    valoracion:number;
    stock:number;
	fecha_creacion: Date;
}
