import express from 'express';
import { StoreCatValidator, UpdateCatValidator } from './validators';
import { IndexCatsController, ShowCatController, StoreCatController, UpdateCatController } from './controllers';

const router = express.Router();

router
	.get('/', IndexCatsController)
	.post('/', StoreCatValidator, StoreCatController)
	.get('/:id', ShowCatController)
	.post('/:id', UpdateCatValidator, UpdateCatController);

export default router;