import express from 'express';
import userController from '../controllers/user.controller.js';

export default () => {
    const router = express.Router();
  
    router.get('/', userController.placeToken)

    return router;
  };


  