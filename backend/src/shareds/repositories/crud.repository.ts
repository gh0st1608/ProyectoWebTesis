import { Request, Response } from 'express';

export default interface CrudRepository {
	getAll: (req: Request, res: Response) => Promise<void>;
    getOne: (req: Request, res: Response) => Promise<void>;
	create: (req: Request, res: Response) => Promise<void>;
	update: (req: Request, res: Response) => Promise<void>;
    delete: (req: Request, res: Response) => Promise<void>;
}
