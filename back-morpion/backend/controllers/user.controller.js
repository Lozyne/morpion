import gameModel from "../models/game.model.js";
import gameServices from "../services/game.service.js";

async function placeToken(req, res, next) {
    let result;

    let jsonParse = JSON.parse(req.query.coordinates); 
    let coordinates = {
        i: jsonParse.line,
        j: jsonParse.col
    }

    let tauxVictoireHuman = gameModel.game.tauxDeVictoire;

    let lineColPossiblesCoordonates = gameModel.game.lineColPossiblesCoordonates;
    let coordinateAITurn;
    let tauxVictoireAI = gameModel.game.tauxDeVictoireAI;

    gameServices.updateVictoryRatePlayer(tauxVictoireAI, tauxVictoireHuman, lineColPossiblesCoordonates, coordinates, true);
    let luckyWinPlayer = gameServices.checkPossibleVictory(tauxVictoireHuman);

    if(luckyWinPlayer != 3) {
        // let AI play

        let luckyWinAI = gameServices.checkPossibleVictory(tauxVictoireAI);

        if(luckyWinAI != 2) {
            for(let i = 0; i< lineColPossiblesCoordonates.length; i++) {
                let currentLine = lineColPossiblesCoordonates[i];
                for(let j = 0; j< currentLine.length; j++) {

                    //Remove coordinates from J1
                    if(currentLine[j].i == coordinates.i && currentLine[j].j == coordinates.j) {

                        j == 0 ? currentLine.splice(j,1): currentLine.splice(j,j);
                        if(coordinateAITurn == undefined) {
                            let indexVictoryIsHuman;
                            if(luckyWinPlayer == 2 ) {
                                indexVictoryIsHuman = gameServices.getIndexCoordinatesLuckyWin(tauxVictoireHuman);
                            }

                            if(currentLine.length > 0) {
                                coordinateAITurn = {
                                    i: i,
                                    j: currentLine[0].j
                                }
                            } else if(currentLine.length >= 0 && lineColPossiblesCoordonates[indexVictoryIsHuman] != null && lineColPossiblesCoordonates[indexVictoryIsHuman].length > 0) {
                                coordinateAITurn = {
                                    i: i,
                                    j: lineColPossiblesCoordonates[indexVictoryIsHuman][0]
                                }
                            }                        
                        }
                    }
                }
            }
            // modification Victory rate AI
            gameServices.updateVictoryRatePlayer(tauxVictoireAI, tauxVictoireHuman, lineColPossiblesCoordonates, coordinateAITurn, false);
            gameServices.removeCoordinate(lineColPossiblesCoordonates, coordinateAITurn);

            luckyWinAI = gameServices.checkPossibleVictory(tauxVictoireAI);

            if(luckyWinAI == 3) {
                result = {
                    aIVictory: true, 
                    userVictory: false,
                    coordinateAITurn: null
                }
            } else {
                result = {
                    aIVictory: false, 
                    userVictory: false,
                    coordinateAITurn: coordinateAITurn
                }
            }
           
        } else if (luckyWinAI == 2) {
            result = {
                aIVictory: true, 
                userVictory: false,
                coordinateAITurn: null
            }
        }
        
    } else {
        result = {
            aIVictory: false, 
            userVictory: true,
            coordinateAITurn: null
        }
    }

    return res.json(result);
}


export default {
    placeToken
  };
  