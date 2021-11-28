import Router from 'express';
import AuthController from '../controllers/auth.controllers';

const routes = Router();

routes.post('/signup', AuthController.signUp);
routes.post('/signin', AuthController.signIn);

export default routes;
