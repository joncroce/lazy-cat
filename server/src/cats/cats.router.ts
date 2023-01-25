import express, { Request, Response } from 'express';
import { BaseCat } from './cat.interface';
import * as CatService from './cats.service';

export const catsRouter = express.Router();

catsRouter.post('/', async (req: Request, res: Response) => {
	const newCat: BaseCat = {
		name: req.body.name,
		description: req.body.description ?? ''
	};

	try {
		const { id } = await CatService.create(newCat);

		if (id) {
			return res.status(200).json(id);
		}

		res.status(500).json(`Error creating cat. Does a cat with the name ${newCat.name} already exist?`);
	} catch (e: unknown) {
		console.error(e);
		res.status(500).json(`Error creating cat.`);
	}
});


catsRouter.get('/', async (req: Request, res: Response) => {

	try {
		const cats = await CatService.findAll();

		if (cats) {
			return res.status(200).json(cats);
		}

		res.status(404).json(`No cats found.`);
	} catch (e: unknown) {
		console.error(e);
		res.status(500).json(`Error finding cats.`);
	}
});

catsRouter.get('/:id', async (req: Request, res: Response) => {
	const id: number = parseInt(req.params.id, 10);
	try {
		const cat = await CatService.find(id);

		if (cat) {
			return res.status(200).json(cat);
		}

		res.status(404).json(`No cat found with id: ${id}`);
	} catch (e: unknown) {
		console.error(e);
		res.status(500).json(`Error finding cat.`);
	}
});