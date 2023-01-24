import Router from 'express-promise-router';
import Users from "../controllers/users";

const router = Router();

router.get('/:id', Users.getById);

export default router;