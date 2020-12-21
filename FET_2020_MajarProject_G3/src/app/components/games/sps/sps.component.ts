import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timer } from 'rxjs';

import { Games } from '../games';
import { GameServiceService } from 'src/app/game-service.service';
@Component({
  selector: 'app-sps',
  templateUrl: './sps.component.html',
  styleUrls: ['./sps.component.scss']
})
export class SpsComponent implements OnInit {
  messge:string="";
  game: Games;
  scores = [0, 0];
  weapons = ['rock', 'paper', 'scissors'];
  playerSelected = -1;
  enemySelected = -1;
  loading = false;
  isResultShow = false;
  theResult = 0;
  highScore: any;
  timeDuration: any;
  timeCount: any;

  pick(weapon: number): void {
    // return immediately when still loading. You don't want
    // tslint:disable-next-line:curly
    if (this.loading) return;
    this.loading = true;
    this.playerSelected = weapon;

    // create a delay to simulate enemy's turn.
    setTimeout(() => {
      this.loading = false;
      // generate a number from 0 - 2
      const randomNum = Math.floor(Math.random() * 3);
      this.enemySelected = randomNum;
      this.checkResult();
      this.isResultShow = true;
    }, Math.floor(Math.random() * 500) + 200);
    this.startTime();
  }

  reset(): void {
    this.scores = [0, 0];
    this.messge="";
  }
  checkResult(): void {
    const playerPick = this.playerSelected;
    const enemyPick = this.enemySelected;
    // if you and the computer have the same weapon, then it is a tie.
    // tslint:disable-next-line:triple-equals
    if (playerPick == enemyPick) {
      this.theResult = 2;
    }
    // tslint:disable-next-line:triple-equals
    else if ((playerPick - enemyPick + 3) % 3 == 1) {
      // YOU WIN
      this.theResult = 0;
      this.scores[0] = this.scores[0] + 1;
      this.game.score = this.scores[0];
      this.highScore = this.scores[0];
      console.log(this.game);
    } else {
      // YOU LOSE
      this.theResult = 1;
      // tslint:disable-next-line:whitespace
      // tslint:disable-next-line:align
      this.scores[1] = this.scores[1] + 1;
    }
  
      if (this.scores[0]==5) 
      {
        this.messge="You won the previous Game, Play Game !!!";
        this.scores[0]=0;
        this.scores[1]=0;
      }
      if (this.scores[1]==5) 
      {
        this.messge ="Opponent won the previous Game, Play Game!!!";
        this.scores[1]=0;
        this.scores[0]=0;
      }
    
  }

  constructor(private router: Router, private gameService: GameServiceService) {
    this.game = {
      game_id: 102,
      game_name: 'Rock-Paper-Scissors',
      score: this.highScore,
      user_id: 101,
      registrationUserId: 1,
    };
  }
  startTime = () => {
    this.timeDuration = timer(0, 1000);
    this.timeDuration.subscribe((x:any) => {
      this.timeCount = x;
      
    });
  };
  ngOnInit(): void {
    this.gameService.getGames().subscribe((g:any) => {
      
    });
  }

  // tslint:disable-next-line:typedef
  goToHome() {
    if (this.game.score !== 0) {
      this.gameService.postGames(this.game).subscribe((g:any) => {
        
      });
    }
    this.router.navigate(['home']);
  }

}
