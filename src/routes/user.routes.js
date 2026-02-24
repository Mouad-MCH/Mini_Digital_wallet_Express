import express from 'express';
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from '../controllers/user.controller.js';
import { validateUser } from '../middleware/validateUser.js';
import { validateParams } from '../middleware/validateParams.js';


const router = express.Router();

router.post('/register', validateUser, createUser);
router.get('/', getAllUsers);
router.get('/:id', validateParams, getUserById);
router.delete('/:id', validateParams, deleteUser);
router.put('/:id', validateParams, validateUser,updateUser);


export default router;