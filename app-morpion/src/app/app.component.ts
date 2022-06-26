import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { GameService } from './game/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  array: string[][]= [['','',''],['','',''],['','','']];
  resultGame: string;
  canPlay: boolean = true;

  constructor( private appService: AppService, private gameService: GameService) { }

  ngOnInit(): void {
    this.gameService.initGame().subscribe();
  }

  play(line: number, column: number) {

    this.array[line][column] = 'X';
    this.canPlay = false; 
    this.appService.placeToken(line, column).subscribe(
      res => {
        if(!res.aIVictory && !res.userVictory) {
          this.array[res['coordinateAITurn'].i][res['coordinateAITurn'].j] = 'O';
        }
        else {
          this.resultGame = res.aIVictory ? 'AI won' : 'J1 won';
        }
        this.canPlay = true;
      }
    )
  }

  getValue(line: number, column: number) {
    return this.array[line][column];
  }
}
