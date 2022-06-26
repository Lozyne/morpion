import express from 'express';
import gameController from '../controllers/game.controller.js';

export default () => {
    const router = express.Router();
  
    router.get('/', gameController.initializeGame)

    return router;
  };


  