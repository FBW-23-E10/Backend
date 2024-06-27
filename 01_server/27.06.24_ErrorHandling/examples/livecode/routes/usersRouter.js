import { Router } from 'express';



import { addUser, deleteUser, getUser, login} from '../controllers/usersController.js'


const usersRouter = Router();

usersRouter.route('/').post(addUser)
usersRouter.route('/:id').get(getUser).delete(deleteUser).post(login)


export default usersRouter;
