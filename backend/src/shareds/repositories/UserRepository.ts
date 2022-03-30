export default interface UserRepository {
	_id?: string;
	name: string;
	last_name: string;
	email: string;
	password: string;
	age: number;
	role?: string;
	create_at: Date
}