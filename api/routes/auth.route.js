import { Router } from 'express';
import authController from '../controllers/auth.controller.js';

const routes = new Router();
routes.post('/signup', authController.signup);

// Add routes
// routes.get('/', SessionController.store);
// routes.put('/', SessionController.store);
// routes.delete('/', SessionController.store);

export default  routes;
