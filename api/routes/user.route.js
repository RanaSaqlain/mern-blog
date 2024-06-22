import { Router } from 'express';
import UserController from '../controllers/user.controller.js';

// import all controllers

const router = new Router();
router.get('/test', UserController.store)

// Add routes
// routes.get('/', SessionController.store);
// routes.post('/', SessionController.store);
// routes.put('/', SessionController.store);
// routes.delete('/', SessionController.store);

export default router;
