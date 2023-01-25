import express from 'express';
import { DeleteCatValidator, ReplaceCatValidator, StoreCatValidator, UpdateCatValidator } from './validators';
import { DeleteCatController, IndexCatsController, ReplaceCatController, ShowCatController, StoreCatController, UpdateCatController } from './controllers';

const router = express.Router();

router
	.get('/', IndexCatsController)
	.post('/', StoreCatValidator, StoreCatController)
	.get('/:id', ShowCatController)
	.put('/:id', ReplaceCatValidator, ReplaceCatController)
	.patch('/:id', UpdateCatValidator, UpdateCatController)
	.delete('/:id', DeleteCatValidator, DeleteCatController);

export default router;