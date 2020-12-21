import { Component, OnInit } from '@angular/core';
import { Games } from '../games';
import { timer } from 'rxjs';
import { Router } from '@angular/router';
import { GameServiceService } from 'src/app/game-service.service';
@Component({
  selector: 'app-number-guess',
  templateUrl: './number-guess.component.html',
  styleUrls: ['./number-guess.component.scss']
})
export class NumberGuessComponent implements OnInit {
  game: Games;
  gameData: any;
  secret = Math.trunc(Math.random() * 20) + 1;
  score = 20;
  highScore = 0;
  userNumber:any;
  bColor = '#222;';
  timeDuration: any;
  timeCount: any;
  checkNumber = () => {
    this.startTime();
    const guess = this.userNumber;
    // if guess is not entered
    if (!guess) {
      // document.querySelector('.message').textContent = 'Enter The Number';
    }
    // if guess is equal random number
    else if (guess === this.secret) {
      // document.querySelector('.message').textContent = 'Correct Number';
      this.bColor = this.getColor();
      this.highScore = this.score;
      
      this.game.score = this.highScore;
      
    }
    // if guess is higher than random number
    else if (guess > this.secret) {
      // document.querySelector('.message').textContent = 'Too High';
      this.score = this.score - 1;
      if (this.score <= 0) {
        // document.querySelector('.message').textContent = 'You LOST';
      }
    }
    // guess is smaller than random number
    else if (guess < this.secret) {
      // document.querySelector('.message').textContent = 'Too Low';
      this.score = this.score - 1;
      if (this.score <= 0) {
        // document.querySelector('.message').textContent = 'You LOST';
      }
    }
  }
  getColor = () => {
    return 'green';
  }
  // for restart the game
  restartGame = () => {
    this.highScore = 0;
    this.score = 20;
    this.bColor = '#222';
    this.userNumber = '';
    // document.querySelector('.message').textContent = 'Start Guessing';
  }
  constructor(private router: Router, private gameService: GameServiceService) {
    this.game = {
      game_id: 101,
      game_name: 'Guess Number',
      score: this.highScore,
      user_id: 201,
      registrationUserId: 1
    };
  }
  startTime = () => {
    this.timeDuration = timer(0, 1000);
    this.timeDuration.subscribe((x:any) => {
      this.timeCount = x;
    });
  }
  ngOnInit(): void {
    this.gameService.getGames().subscribe((g:any) => {
      this.gameData = g;
      console.log(this.gameData, 'Hello Backend games');
    });
  }
  // tslint:disable-next-line:typedef
  goToHome() {
    if (this.game.score !== 0) {
      this.gameService.postGames(this.game).subscribe((g:any) => {
        console.log('Hello Pranav Guess My Number');
      });
    }
    this.router.navigate(['home']);
  }
}


