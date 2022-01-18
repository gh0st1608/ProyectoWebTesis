import { Schema, SchemaTypes, model } from 'mongoose';

const ProductoSchema = new Schema({
	nombre: {
		type: String,
		required: true
	},
    categoria:{
        type: String,
		required: true
    },
    caracteristicas:{
        type: Object,
		required: false
    },
	descripcion_corta: {
		type: String,
		required: true
	},
	descripcion_larga: {
		type: String,
		required: true
	},
	precio: {
		type: SchemaTypes.Number,
		required: true,
		min: 0
	},
    moneda: {
		type: String,
		required: true
	},
    valoracion: {
		type: SchemaTypes.Number,
		required: true,
		min: 1,
        max: 5
	},
    stock: {
		type: SchemaTypes.Number,
		required: true,
		min: 0
	},
	activo: {
		type: Boolean,
		required: false,
	},
	fecha_creacion: {
		type: SchemaTypes.Date,
		default: Date.now()
	}
});

export default model('productos', ProductoSchema);
