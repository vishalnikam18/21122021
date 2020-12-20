import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-display-quiz',
  templateUrl: './display-quiz.component.html',
  styleUrls: ['./display-quiz.component.scss']
})
export class DisplayQuizComponent implements OnInit {

  current: any = [];
  // current: Tutorial = {
  //   quizname: "",
  //   time: "",
  //   count: "",
  //   category: "",
  // };

  // @Input categoryId: any;

  constructor(
    private tutorialService: QuizService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getQuizes(this.route.snapshot.params.id);
  }

  quizeRounting(id:any)
  {
  console.log(id);
  this.router.navigate(['/dashboard/mcqPage/'+id])
  }
  
  getQuizes(id: string): void {
    console.log("data");
    this.tutorialService.get(id).subscribe(
      (data) => {
        this.current = data;
        console.log(this.current);
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
