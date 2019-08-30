import {Router} from 'express';

import authMiddleware from './app/middlewares/auth';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import ContactsController from './app/controllers/ContactsController';
import TransactionsController from './app/controllers/TransactionsController';



const routes = new Router();

routes.post('/user', UserController.store);
routes.post('/sessions', SessionController.store);

// Somente usuarios autenticados
routes.use(authMiddleware);
routes.get('/user', UserController.index);

routes.post('/contacts', ContactsController.store);
routes.delete('/contact/:id', ContactsController.delete);
routes.get('/contacts', ContactsController.index);
routes.put('/contact/:id', ContactsController.update);

routes.post('/transaction/:id', TransactionsController.store);
routes.get('/transactions', TransactionsController.index);



export default routes;
