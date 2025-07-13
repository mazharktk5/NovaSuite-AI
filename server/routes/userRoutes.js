import express from 'express'
import { getPublishedCreation, getUserCreation, toggleLikeCreation } from '../controllers/userController.js';


const userRouter = express.Router();

userRouter = express.Router();

userRouter.get('/get-user-creations', auth, getUserCreation)
userRouter.get('/get-published-creations', auth, getPublishedCreation)
userRouter.post('/toggle-like-creation', auth, toggleLikeCreation)


export default userRouter