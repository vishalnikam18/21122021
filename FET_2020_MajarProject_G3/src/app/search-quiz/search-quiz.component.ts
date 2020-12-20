import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Quize }  from '../models/Search.model';
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
  quizList:any=[];
  quizname='';
  selected: boolean = false;

  favlistData: any;
  // quizes: any;
  quizelistLength: any;
  favListLength: any;
  quizess: any = [];
  quizeId:any;
  user:any;
  userId:any;
  userMail:any;
  constructor(private quizeService: SearchService,
    private route: ActivatedRoute,
    private router: Router,
    private addFavService: AddtoFavService,
    private activatedRoute:ActivatedRoute,
    private loginService:LoginServicesService
    ) { 
     
    this.loginService.getuserDetails().subscribe((data:any) =>{
      this.user=JSON.parse(JSON.stringify(data));
      this.userId=this.user.id;
       this.userMail=this.user.email;
      this.addFavService.getFavListOfUser(this.userId).subscribe((res: any) => {
        this. favlistData = res;
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
        (data : any) => {
          this.quizes = data;
          this.quizList=data;
          
       
        },
        (error : any) => {
          
        });
     
  }



  toggleSelected(qid: any, i: any): void {
 
    this.quizess[i].status=!this.quizess[i].status;

 let data = this.favlistData.find((item: { quizeId: any; }) => item.quizeId === qid);



  if(this.quizess[i].status==true){
 if (data == undefined)
  {
   let fav = {
     "userid": this.userId,
     "quizid": qid,
     "status": true
   }
     this.addFavService.insertFav(fav).subscribe((res) => {});
 } 
 else {
   let updateStatus = {
     "status": true,
     "userId": this.userId
   }
   this.addFavService.updateFav(this.quizeId, updateStatus).subscribe((res) => {
;
   })
 }
 }
 else{
   let updateStatus = {
     "status": false,
     "userId":this.userId }
       this.addFavService.updateFav(qid,updateStatus).subscribe((res)=>{});
 }


}



showQuize(){
  
  
  //if there is no data in favourite list
        if(this.favListLength==0){
          for (let i: any = 0; i < this.quizList.length; i++) {
            this.quizess[i] = {
              ...this.quizList[i],
              status: false
           
            };
          }
        }

//if length of search result is more then length of data in favourite list
  if (this.quizList.length >= this.favListLength) {
    
    for (let i: any = 0; i < this.quizList.length; i++) {

      for (let j: any = 0; j < this.favlistData.length; j++) {
   
        if (this.quizList[i].id == this.favlistData[j].quizeId)
         {
           
          this.quizess[i] = {
            ...this.quizList[i],
            status: this.favlistData[j].status
       
          };
          break;
        }
        else {
          this.quizess[i] = {
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
          this.quizess[j] = {
            ...this.quizList[j],
            status: this.favlistData[i].status
    
          };

          break;
        }
        else {
          this.quizess[j] = {
            ...this.quizList[j],
            status: false
          };
        }
      }
    }
  }
}
  

}
