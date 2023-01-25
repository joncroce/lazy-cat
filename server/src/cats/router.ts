import express from 'express';
import { DeleteCatValidator, StoreCatValidator, UpdateCatValidator } from './validators';
import { DeleteCatController, IndexCatsController, ShowCatController, StoreCatController, UpdateCatController } from './controllers';

const router = express.Router();

router
	.get('/', IndexCatsController)
	.post('/', StoreCatValidator, StoreCatController)
	.get('/:id', ShowCatController)
	.patch('/:id', UpdateCatValidator, UpdateCatController)
	.delete('/:id', DeleteCatValidator, DeleteCatController);

export default router;