import { Component, OnInit, Input } from '@angular/core';
import { Question } from 'src/app/models/question.model';
import { Router, ActivatedRoute } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service';

@Component({
  selector: 'app-add-questions',
  templateUrl:'./add-questions.component.html',
  styleUrls: ['./add-questions.component.scss']
})
export class AddQuestionsComponent implements OnInit {
  @Input() quizname: any;
  category: any;
  type: any;
  submitted = false;
  que = new Question();
  constructor(
    private questionservice: QuestionsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
   
    this.getTypeName();
    this.quizname=this.route.snapshot.paramMap.get("quizname")
  }

  

  addQuestion() {
    if (typeof this.que.answer == "undefined") {
      console.log("This is if");
      alert("Please select the answer");
      return;
    }
    this.submitted = true;
    console.log(this.que.answer, this.quizname);
    this.que.quizname = this.quizname;
    console.log(this.que, "This is from form");
    this.questionservice.addQuestion(this.que).subscribe((data) => {
      console.log(data);
      // alert(data);
    });
  }

  btnClick() {
    this.router.navigate(["/dashboard"]);
  }
  

  getTypeName() {
    return this.questionservice.getTypeName().subscribe((que) => {
      this.type = que;
      console.log(this.type);
    });
  }

}
