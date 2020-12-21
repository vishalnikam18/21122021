import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Quize } from '../models/Search.model';
import { SearchService } from '../search.service';
import { AddtoFavService } from '../services/addto-fav.service';
import { LoginServicesService } from '../login-services.service';

@Component({
  selector: 'app-search-quiz',
  templateUrl: './search-quiz.component.html',
  styleUrls: ['./search-quiz.component.scss']
})
export class SearchQuizComponent implements OnInit {
  quizes?: Quize[];
  quizList: any = [];
  quizname = '';
  selected: boolean = false;

  favlistData: any;
  // quizes: any;
  quizelistLength: any;
  favListLength: any;
  UpdatedQuiz: any = [];
  quizeId: any;
  user: any;
  userId: any;
  userMail: any;
  constructor(private quizeService: SearchService,
    private route: ActivatedRoute,
    private router: Router,
    private addFavService: AddtoFavService,
    private activatedRoute: ActivatedRoute,
    private loginService: LoginServicesService
  ) {

    this.loginService.getuserDetails().subscribe((data: any) => {
      this.user = JSON.parse(JSON.stringify(data));
      this.userId = this.user.id;
      this.userMail = this.user.email;
      this.addFavService.getFavListOfUser(this.userId).subscribe((res: any) => {
        this.favlistData = res;
        this.favListLength = res.length;

      });
    });
  }

  ngOnInit(): void {
    this.searchTitle();
  }


  searchTitle(): void {
    //
    this.quizeService.findByTitle(this.quizname)
      .subscribe(
        (data: any) => {
          this.quizes = data;
          this.quizList = data;
        },
        (error: any) => {

        });

  }



  toggleSelected(qid: any, i: any): void {
    this.addFavService.getFavListOfUser(this.userId).subscribe((res: any) => {
      this.favlistData = res;
      this.favListLength = res.length;
      this.UpdatedQuiz[i].status=res.status;


    });
console.log(qid);
    this.UpdatedQuiz[i].status = !this.UpdatedQuiz[i].status;
    debugger;
    let data = this.favlistData.find((item: { quizeId: any; }) => item.quizeId === qid);



    if (this.UpdatedQuiz[i].status == true) {
      if (data == null)
       {
        let fav = {
          "userid": this.userId,
          "quizid": qid,
          "status": true
        }
        this.addFavService.insertFav(fav).subscribe((res) => { this.showQuize();});
       
      }
      else 
      {
      
        alert("else");
        let updateStatus = {
          "status": true,
          "userId": this.userId
        }
        this.addFavService.updateFav(qid, updateStatus).subscribe((res) => {
          this.showQuize();
        })
      
      }
    }
    else {
      let updateStatus = {
        "status": false,
        "userId": this.userId
      }
      this.addFavService.updateFav(qid, updateStatus).subscribe((res) => { this.showQuize(); });

    }


  }



  showQuize() {


    //if there is no data in favourite list
    if (this.favListLength == 0) {
      for (let i: any = 0; i < this.quizList.length; i++) {
        this.UpdatedQuiz[i] = {
          ...this.quizList[i],
          status: false

        };
      }
    }

    //if length of search result is more then length of data in favourite list
    if (this.quizList.length >= this.favListLength) {

      for (let i: any = 0; i < this.quizList.length; i++) {

        for (let j: any = 0; j < this.favlistData.length; j++) {

          if (this.quizList[i].id == this.favlistData[j].quizeId) {

            this.UpdatedQuiz[i] = {
              ...this.quizList[i],
              status: this.favlistData[j].status

            };
            break;
          }
          else {
            this.UpdatedQuiz[i] = {
              ...this.quizList[i],
              status: false,
            };
          }
        }
      }
    }
    //if length of data in favourite list is more then length of data in search result list
    else {
      for (let i: any = 0; i < this.favListLength; i++) {
        for (let j: any = 0; j < this.favListLength; j++) {

          if (this.quizList[i].id == this.favlistData[j].quizeId) {
            this.UpdatedQuiz[j] = {
              ...this.quizList[j],
              status: this.favlistData[i].status

            };

            break;
          }
          else {
            this.UpdatedQuiz[j] = {
              ...this.quizList[j],
              status: false
            };
          }
        }
      }
    }
  }


}
