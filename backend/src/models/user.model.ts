import { Schema, SchemaTypes, model } from 'mongoose';

//LLAMADO PRODUCTO PROBLEMAS AL CREAR NUEVA DB
const UserSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	last_name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	role: {
		type: String,
		required: false
	},
	password: {
		type: String,
		required: true
	},
	age: {
		type: SchemaTypes.Number,
		required: true,
		min: 18,
		max: 128
	},
	is_single: {
		type: Boolean,
		required: false,
	},
	courses: {
		type: Object,
		required: false
	},
	create_at: {
		type: SchemaTypes.Date,
		default: Date.now()
	}
});

export default model('users', UserSchema);