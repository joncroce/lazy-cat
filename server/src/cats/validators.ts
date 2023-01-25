import { Request, Response, NextFunction } from 'express';
import { body, validationResult, matchedData, ValidationChain } from 'express-validator';
import { ShowCatService } from './services';

const isValidId = (id: any) => (isNaN(id) || id <= 0);

const runValidations = async (validations: ValidationChain[], req: Request) =>
	Promise.all(validations.map(validation => validation.run(req)));

export const StoreCatValidator = async (req: Request, res: Response, next: NextFunction) => {
	const validations = [
		body('name').isString().not().isEmpty().trim().escape().isLength({ min: 1, max: 50 }),
		body('description').customSanitizer(value => value || '').isString().trim().escape().isLength({ min: 0, max: 500 })
	];
	await runValidations(validations, req);

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	req.body = matchedData(req, { locations: ['body'] });
	if (Object.keys(req.body).length === 0) {
		return res.status(400).json("Storing failed; no valid fields submitted.");
	}

	next();
};

export const ReplaceCatValidator = async (req: Request, res: Response, next: NextFunction) => {
	const id = +req.params.id;
	if (isNaN(id) || id <= 0) {
		return res.status(400).json("Replace failed; invalid ID given.");
	}

	try {
		await ShowCatService(id);
	} catch (e: unknown) {
		console.error(e);
		return res.status(404).json(`Replace failed; no cat found with that ID.`);
	}

	const validations = [
		body('name').isString().trim().escape().isLength({ min: 1, max: 50 }),
		body('description').customSanitizer(value => value || '').isString().trim().escape().isLength({ min: 0, max: 500 }).default('')
	];
	await runValidations(validations, req);

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	req.body = matchedData(req, { locations: ['body'] });

	next();
};

export const UpdateCatValidator = async (req: Request, res: Response, next: NextFunction) => {
	const id = +req.params.id;
	if (isNaN(id) || id <= 0) {
		return res.status(400).json("Update failed; invalid ID given.");
	}

	try {
		await ShowCatService(id);
	} catch (e: unknown) {
		console.error(e);
		return res.status(404).json(`Update failed; no cat found with that ID.`);
	}

	const validations = [
		body('name').optional().isString().trim().escape().isLength({ min: 1, max: 50 }),
		body('description').optional().isString().trim().escape().isLength({ min: 0, max: 500 })
	];
	await runValidations(validations, req);

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	req.body = matchedData(req, { locations: ['body'] });
	if (Object.keys(req.body).length === 0) {
		return res.status(400).json("Update failed; no valid fields submitted.");
	}

	next();
};

export const DeleteCatValidator = async (req: Request, res: Response, next: NextFunction) => {
	const id = +req.params.id;
	if (isNaN(id) || id <= 0) {
		return res.status(400).json("Delete failed; invalid ID given.");
	}

	try {
		await ShowCatService(id);
	} catch (e: unknown) {
		console.error(e);
		return res.status(404).json(`Delete failed; no cat found with that ID.`);
	}

	next();
};