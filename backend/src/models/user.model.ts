import { Schema, SchemaTypes, model } from 'mongoose';

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
	create_at: {
		type: SchemaTypes.Date,
		default: Date.now()
	}
});

export default model('users', UserSchema);
