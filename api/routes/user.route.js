import { Router } from 'express';
import UserController from '../controllers/user.controller.js';
import { verifyUser } from '../utils/VerifyUser.js';

const router = new Router();

router.get('/test', UserController.store);

// Add authentication middleware if you have it
router.post('/upload',  UserController.uploadImage);
router.put('/update/:id', verifyUser , UserController.update);
router.delete('/delete/:id', verifyUser , UserController.delete);
export default router;