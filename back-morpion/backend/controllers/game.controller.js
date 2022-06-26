import gameModel from '../models/game.model.js';

async function initializeGame(req, res, next) {
    let tauxDeVictoire = [];
    let tauxDeVictoireAI = [];

    let lineColPossiblesCoordonates = [];

    for(let i=0; i<(3*2)+2; i++) {
        tauxDeVictoire[i] = 0;
        tauxDeVictoireAI[i] = 0;
    }

    let traitementColumn = false; 
    // lignes position
    for(let i=0; i<3; i++) {
        lineColPossiblesCoordonates.push([])

        
        for(let j=0; j<3; j++) {
            if(!traitementColumn) {
                // Coordonnées possible lignes 
                lineColPossiblesCoordonates[i].push({i:i,j:j});
           } else {
                // Coordonnées possible colonnes 
                lineColPossiblesCoordonates[lineColPossiblesCoordonates.length-1].push({i:j,j:i});
           }
        }
        
        if(i==2 && !traitementColumn) {
            i=-1;
            traitementColumn = true;
        }
    }


    //diagonales
    lineColPossiblesCoordonates.push([]);
    for(let i=0; i<3;i++) {
        lineColPossiblesCoordonates[lineColPossiblesCoordonates.length-1].push({i:i,j:i});
    }

    lineColPossiblesCoordonates.push([]);
    let j = 0;
    for(let i=2; i>=0;i--) {

        lineColPossiblesCoordonates[lineColPossiblesCoordonates.length-1].push({i:i,j:j});
        j++;
    }

    gameModel.game =  {tauxDeVictoire: tauxDeVictoire, lineColPossiblesCoordonates:lineColPossiblesCoordonates, tauxDeVictoireAI: tauxDeVictoireAI};
    
    console.log(gameModel.game.lineColPossiblesCoordonates);
    return res.json(gameModel.game);
}

export default {
    initializeGame
  };
  