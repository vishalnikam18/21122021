import { Component, OnInit } from '@angular/core';
import { LoginServicesService } from 'src/app/login-services.service';
import { AddtoFavService } from 'src/app/services/addto-fav.service';

@Component({
  selector: 'app-fav-list',
  templateUrl: './fav-list.component.html',
  styleUrls: ['./fav-list.component.scss']
})
export class FavListComponent implements OnInit {

  favList:any;
  userId:any;
  user:any;
  constructor(private addToFavServ:AddtoFavService,private loginService:LoginServicesService) {

    this.loginService.getuserDetails().subscribe((data:any) =>{
      this.user=JSON.parse(JSON.stringify(data));
      this.userId=this.user.id;
      this.getFavList();
    });
     
   }

  ngOnInit(): void {
  }
  getFavList(){
    this.addToFavServ.getMyFavlist(this.userId).subscribe((res: any) => {
      this.favList=res;
      console.log(this.favList);
      
    })
  }
  removeFav(quizid:any){
    let status={
      "status":false,
      "userId":this.userId
    }

    this.addToFavServ.updateFav(quizid,status).subscribe((res:any)=>{
       this.getFavList();
       
    });
   
  }

}
