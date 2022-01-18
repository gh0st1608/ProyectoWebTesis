import { Schema, SchemaTypes, model } from 'mongoose';

const TestSchema = new Schema({
	test_1: {
		type: String,
		required: true
	},
	test_2: {
		type: SchemaTypes.Number,
		required: true,
		min: 18,
		max: 128
	},
	test_3: {
		type: Boolean,
		required: false,
	},
	test_4: {
		type: SchemaTypes.Date,
		default: Date.now()
	}
});

export default model('tests', TestSchema);
