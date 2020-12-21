import { Component, OnInit } from '@angular/core';
import { Quiz } from 'src/app/models/quiz.model';
import { QuizService } from 'src/app/services/quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.scss']
})
export class AddQuizComponent implements OnInit {

  
  quiz = new Quiz();
  category : any;
  submitted = false;
  constructor(private tutorialService: QuizService,private router: Router) { }

  
  ngOnInit(): void {
   
    this.getCategoryName();
    
  }
  getCategoryName() {
    return this.tutorialService.getCategoryName()
      .subscribe(
        quiz =>{
          this.category = quiz;
          console.log( this.category);
        } 
    );
  }

  
  addQuize(id:any){
    
    console.log(this.quiz, "This is from form")
    this.tutorialService.addQuize(this.quiz).subscribe(data=>{
      if(Array.isArray(data) === true )
      {
        console.log(data);
        this.submitted = true;
      }
      else
      {
      //   if(data.hasOwnProperty("original") && data.original.code !== "ER_DUP_ENTRY" )
      // {
  console.log(data);
  this.submitted = false;
  alert("This is duplicate entry......")
      // }
       
      }
   
      console.log(id)
      this.router.navigate(['/dashboard/question/'+id.quizname])
    })
  }

}
