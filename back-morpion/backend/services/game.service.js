import gameModel from "../models/game.model.js";

function checkPossibleVictory(tauxVictoire) {
      let max = tauxVictoire[0];
      for(let i=1; i< tauxVictoire.length; i++) {
          if(max<tauxVictoire[i]) {
            max = tauxVictoire[i];
          }
      }

    return max;
}


function getIndexCoordinatesLuckyWin(tauxVictoire) {
  let index = 0;
  let max = tauxVictoire[0];
  for(let i=1; i< tauxVictoire.length; i++) {
      if(max<tauxVictoire[i]) {
        index = i;
      }
  }

return index;
}

function updateVictoryRatePlayer(tauxVictoireAI, tauxVictoireHuman, lineColPossiblesCoordonates, playerCoordinates, human) {
  console.log(playerCoordinates)
  for(let i = 0; i< lineColPossiblesCoordonates.length; i++) {
    let currentLine = lineColPossiblesCoordonates[i];
    for(let j = 0; j< currentLine.length; j++) {

        if(currentLine[j].i == playerCoordinates.i && currentLine[j].j == playerCoordinates.j) {

            let lineOrColTauxIndex; 
            if(currentLine.length > 0 && lineOrColTauxIndex == undefined) {
                console.log(human)
                // change Victory rate
                human ? addVictoryRateHuman(tauxVictoireHuman,tauxVictoireAI, i): addVictoryRateAI(tauxVictoireHuman,tauxVictoireAI, i);
            }
        }
    }
}}

function removeCoordinate( lineColPossiblesCoordonates, playerCoordinates) {
  for(let i = 0; i< lineColPossiblesCoordonates.length; i++) {
    let currentLine = lineColPossiblesCoordonates[i];
    for(let j = 0; j< currentLine.length; j++) {

        //Remove coordinates
        if(currentLine[j].i == playerCoordinates.i && currentLine[j].j == playerCoordinates.j) {

            j == 0 ? currentLine.splice(j,1): currentLine.splice(j,j);
        }
    }
}}

function addVictoryRateHuman(tauxVictoireHuman, tauxVictoireAI, index) {
  tauxVictoireHuman[index]++;
  tauxVictoireAI[index]--;
}

function addVictoryRateAI(tauxVictoireHuman, tauxVictoireAI, index) {
  tauxVictoireHuman[index]--;
  tauxVictoireAI[index]++;

  console.log(tauxVictoireAI);
}


export default {
  checkPossibleVictory,
  getIndexCoordinatesLuckyWin,
  updateVictoryRatePlayer,
  addVictoryRateHuman,
  addVictoryRateAI,
  removeCoordinate
  };
  