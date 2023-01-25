import { Request, Response, NextFunction } from 'express';
import { body, validationResult, matchedData, ValidationChain } from 'express-validator';

const runValidations = async (validations: ValidationChain[], req: Request) =>
	Promise.all(validations.map(validation => validation.run(req)));

export const StoreCatValidator = async (req: Request, res: Response, next: NextFunction) => {
	const validations = [
		body('name').isString().not().isEmpty().trim().escape().isLength({ min: 1, max: 50 }),
		body('description').optional().isString().trim().escape().isLength({ min: 0, max: 500 })
	];
	await runValidations(validations, req);

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	req.body = matchedData(req, { locations: ['body'] });
	if (Object.keys(req.body).length === 0) {
		return res.status(400).json("No valid fields submitted for storing cat.");
	}

	next();
};

export const UpdateCatValidator = async (req: Request, res: Response, next: NextFunction) => {
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
		return res.status(400).json("No valid fields submitted for updating cat.");
	}

	const id = +req.params.id;
	if (isNaN(id) || id <= 0) {
		return res.status(400).json("Invalid ID");
	}

	next();
};