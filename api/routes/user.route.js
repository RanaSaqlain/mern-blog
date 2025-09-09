import { Router } from 'express';
import UserController from '../controllers/user.controller.js';

const router = new Router();

router.get('/test', UserController.store);

// Add authentication middleware if you have it
router.post('/upload', UserController.uploadImage);

export default router;