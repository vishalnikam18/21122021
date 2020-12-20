import { Component, OnInit, OnDestroy, PipeTransform, Pipe } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { AddtoFavService } from 'src/app/services/addto-fav.service';
import { McqService } from 'src/app/services/mcq.service';
import { AddfavService } from 'src/app/services/addfav.service';
import { AuthServiceService } from 'src/app/auth-service.service';
import { LoginServicesService } from 'src/app/login-services.service';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-mcq',
  templateUrl: './mcq.component.html',
  styleUrls: ['./mcq.component.scss']
})
export class McqComponent implements OnInit,OnDestroy {
  remainingTime: any = [];
  countDown: Subscription = new Subscription();
  counter: any;
  tick = 1000;

  userName: any;
  enable : boolean = false;
  qidid: any;
  ques: any = [];
  mydata: any;
  favData: any;
  userId: any;
  quizeId:any ;
  userMail: any ;
  que: any = [];
  selected: boolean = false;
  correctans: boolean = false;
  checkAns: boolean = false;
  questionobj: any;
  desc: any;
  maxScorer: any
  score: number = 0;
  updateinterval: any;
  user: any;
  
  constructor(
    public service: McqService,
    private myserv: AddtoFavService,
    private serv: AddfavService,
    private router: Router,
    private activatedRoute:ActivatedRoute,
    private loginService:LoginServicesService
  ) {


    this.activatedRoute.params.subscribe(quizId=>{
      this.quizeId=quizId['id'];
      console.log("fgdsh",this.quizeId);
      
  });

    this.loginService.getuserDetails().subscribe((data:any) =>{
      this.user=JSON.parse(JSON.stringify(data));
      this.userId=this.user.id;
       this.userMail=this.user.email;

         // Status service
       this.service.getStatusList(this.userId, this.quizeId).subscribe((res: any) => {
        this.mydata = res;
        console.log(this.mydata+"gsdsegfehfgehjfg");
        
        for (let i = 0; i < this.mydata.length; i++) {
          if (this.mydata[i].userans == this.mydata[i].userqu.answer) {
            this.score += 1;
          } else {
            this.score = this.score;
          }
        }
      });
  
      //favourite
      this.myserv.getFavList(this.userId, this.quizeId).subscribe((res: any) => {
        this.favData = res;
        this.selected = this.serv.getList(this.favData);
      });
  
      //High score
      this.service.getScore(this.quizeId).subscribe(
        (data: any) => {
          this.maxScorer = data.maxscore;
          this.userName = data.usersc.username;
          
        },
        (error) => {
          console.log(error);
        }
      ); 
   
    })

  
  
  }

  ngOnInit(): void {}
  
 

  toggleFavButton(): void {
    
    let fav = {
      quizid: this.quizeId,
      userid: this.userId,
      status: true,
    };
    this.selected = this.serv.favToggel(fav);
  }

  //set quize timer
  setTimer() {
    this.countDown = timer(0, this.tick).subscribe(() => {
      --this.counter;
      if (this.counter == 0) {
        this.submitQuiz();
      }
    });
  }

  //set time interval for quize
setInterval(){

  this.updateinterval = setInterval(() => {
    console.log("interval");
    
        let status_timerUpdate = {
          remainingtime: this.counter,
          quizeId: this.quizeId,
          userId: this.userId,
        };
        this.service.updatetimer(status_timerUpdate).subscribe((res: any) => {});
      }, 10000);
      
}


  //show quiz list
  quizlist() {
 
    this.enable =  true;
    if (this.mydata.length== 0) {
      this.service.getTimer(this.quizeId).subscribe((res: any) => {
        this.counter = res.time;
        this.setTimer();
        
      });
    } else {
      this.counter = this.mydata[this.mydata.length - 1].remainingtime;
      this.setTimer();
      this.setInterval();
    }

    this.service.getallquestions(this.quizeId).subscribe((res: any) => {
      this.que = res;
      for (let i: any = 0; i < this.que.length; i++) {
        this.ques[i] = {
          ...this.que[i],
          disable: false,
          userSelected: false,
          selectedOption: null,
          wrong1: false,
          wrong2: false,
          wrong3: false,
          wrong4: false,
        };
        if (this.mydata.length != 0) {
          for (let j: any = 0; j < this.mydata.length; j++) {
            if (this.que[i].id == this.mydata[j].questionId) {
              this.ques[i] = {
                ...this.que[i],
                status: true,
                userAns: this.mydata[j].userans,
              };
              break;
            } else {
              this.ques[i] = { ...this.que[i], status: false };
              console.log('else in', this.ques[i], i, j);
            }
          }
        } else {
          this.ques[i] = { ...this.que[i], status: false };
          console.log('else in 2', this.ques[i]);
        }
      }
    });
  }

  setAnswer(
    option: string,
    questionid: number,
    ans: string,
    question: any,
    i: any
  ) {
   
    this.ques[i] = {
      ...this.que[i],
      disable: true,
      userSelected: true,
      selectedOption: option,
      wrong1: false,
      wrong2: false,
      wrong3: false,
      wrong4: false,
    };
    let options = [
      question.option1,
      question.option2,
      question.option3,
      question.option4,
    ];
    let index = options.indexOf(option);
    console.log(index);
    if (index == 0 && option != ans) {
      this.ques[i] = {
        ...this.que[i],
        disable: true,
        userSelected: true,
        selectedOption: option,
        wrong1: true,
        wrong2: false,
        wrong3: false,
        wrong4: false,
      };
    } else if (index == 1 && option != ans) {
      this.ques[i] = {
        ...this.que[i],
        disable: true,
        userSelected: true,
        selectedOption: option,
        wrong1: false,
        wrong2: true,
        wrong3: false,
        wrong4: false,
      };
    } else if (index == 2 && option != ans) {
      this.ques[i] = {
        ...this.que[i],
        disable: true,
        userSelected: true,
        selectedOption: option,
        wrong1: false,
        wrong2: false,
        wrong3: true,
        wrong4: false,
      };
    } else if (index == 3 && option != ans) {
      this.ques[i] = {
        ...this.que[i],
        disable: true,
        userSelected: true,
        selectedOption: option,
        wrong1: false,
        wrong2: false,
        wrong3: false,
        wrong4: true,
      };
    }

    option == ans ? (this.score += 1) : this.score;

    let status = {
      quizeId: this.quizeId,
      userId: this.userId,
      userans: option,
      questatus: true,
      questionId: questionid,
      remainingtime: this.counter,
    };

    this.service.insertstatus(status).subscribe((res: any) => {
      console.log(res);
      if(this.updateinterval)
      {
        alert("already set")
      }
      else{
        this.setInterval();
      }
    });
  }

  //descriptive question
  onblurdesc(questionid: number, questionanswer: string, event: any, i: any) {
    this.ques[i]={...this.que[i],disable:true,answerByUser:event.target.value}
    let value = event.target.value;
   
    let status = {
      quizeId: this.quizeId,
      userId: this.userId,
      userans: value,
      questatus: true,
      questionId: questionid,
      remainingtime: this.counter,
    };
    questionanswer == value ? (this.score += 1) : this.score;
    this.service.insertstatus(status).subscribe((res: any) => {
      console.log(res);
      if(this.updateinterval)
      {
 
      }
      else{
        this.setInterval();
      }
    });
  }

  //submit quiz and timer off
  submitQuiz() {
    this.countDown.unsubscribe();
    clearInterval(this.updateinterval);
    alert("insubmit"+this.userMail);
    
    let scoreData = {
      email: this.userMail,
      score: this.score,
    };
    let score = {
      score: this.score,
      quizeId: this.quizeId,
      userId: this.userId,
    };
    this.service.saveScore(score).subscribe((res: any) => {
      console.log(res);
    });

    this.service.clearstatus(this.quizeId, this.userId).subscribe((res: any) => {
      console.log(res);
    });
    this.service.sendmail(scoreData).subscribe((res: any) => {
      console.log(res);
    });
  //  this.router.navigate(['/fav']);
  }
  ngOnDestroy():void{
    this.countDown.unsubscribe();
    if(this.updateinterval){

      clearInterval(this.updateinterval);
    }
  }
}



@Pipe({
  name: 'formatTime',
})
export class FormatTimePipe implements PipeTransform {
  transform(value: number): string {
    const hours: number = Math.floor(value / 3600);
    const minutes: number = Math.floor((value % 3600) / 60);
    return (
      ('00' + hours).slice(-2) +
      ':' +
      ('00' + minutes).slice(-2) +
      ':' +
      ('00' + Math.floor(value - minutes * 60)).slice(-2)
    );
  }
 

}