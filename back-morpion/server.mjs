import usersRouter from './backend/routes/user.routes.js';
import gamesRouter from './backend/routes/game.routes.js';

import express from 'express';
import cors from 'cors';

const app = express(); // Creating an express object
  
const port = 8000;  // Setting an port for this application
app.use(cors());

app.use('/api/users', usersRouter());
app.use('/api/games', gamesRouter());

// Starting server using listen function
app.listen(port, function (err) {
   if(err){
       console.log("Error while starting server");
   }
   else{
       console.log("Server has been started at "+port);
   }
})

  
  