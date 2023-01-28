import { Request, Response } from 'express';
import { Cat, BaseCat } from './interfaces';
import { DeleteCatService, IndexCatsService, ReplaceCatService, ShowCatService, StoreCatService, UpdateCatService } from './services';

export const IndexCatsController = async (req: Request, res: Response) => {
	try {
		const cats = await IndexCatsService();
		if (cats) {
			return res.status(200).json(cats);
		}

		return res.status(404).json(`No cats found.`);
	} catch (e: unknown) {
		console.error(e);
		return res.status(500).json(`Error finding cats.`);
	}
};

export const ShowCatController = async (req: Request, res: Response) => {
	try {
		const id = +req.params.id;

		const cat = await ShowCatService(id);
		if (cat) {
			return res.status(200).json(cat);
		}

		return res.status(404).json(`No cat found with id: ${id}`);
	} catch (e: unknown) {
		console.error(e);
		return res.status(500).json(`Error finding cat.`);
	}
};

export const StoreCatController = async (req: Request, res: Response) => {
	try {
		const newCat: BaseCat = req.body;
		const { id } = await StoreCatService(newCat);
		if (id) {
			return res.status(201).json(id);
		}

		res.status(500).json(`Error creating cat. Does a cat with the name ${newCat.name} already exist?`);
	} catch (e: unknown) {
		console.error(e);
		res.status(500).json(`Error creating cat.`);
	}
};

export const ReplaceCatController = async (req: Request, res: Response) => {
	try {
		const { id } = await ReplaceCatService(+req.params.id, req.body) as Cat;
		return res.status(200).json(`Successfully replaced cat with ID ${id}`);
	} catch (e: unknown) {
		console.error(e);
		return res.status(500).json(`Error replacing cat.`);
	}
};

export const UpdateCatController = async (req: Request, res: Response) => {
	try {
		const { id } = await UpdateCatService(+req.params.id, req.body) as Cat;
		return res.status(200).json(`Successfully updated cat with ID ${id}`);
	} catch (e: unknown) {
		console.error(e);
		return res.status(500).json(`Error updating cat.`);
	}
};

export const DeleteCatController = async (req: Request, res: Response) => {
	try {
		const result = await DeleteCatService(+req.params.id);
		console.info(`${result.numDeletedRows} rows deleted from Cat table.`);
		return res.status(200).json(`Successfully deleted cat.`);
	} catch (e: unknown) {
		console.error(e);
		return res.status(500).json(`Error deleting cat.`);
	}
};