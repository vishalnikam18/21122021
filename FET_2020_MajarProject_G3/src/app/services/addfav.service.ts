import { Injectable } from '@angular/core';
import { AddtoFavService } from './addto-fav.service';

@Injectable({
  providedIn: 'root'
})
export class AddfavService {

  
    mydata: any;
    selected: any=false;

    constructor(private serv: AddtoFavService) 
    {}
    public getList(data:any): boolean {
              this.mydata=data;
        console.log("mydata",data);
        if (data != null) {
            this.selected = data.status;
            return this.selected;
        }
        else {
            console.log("no data");
            return this.selected;

        }

    }

    favToggel(fav: any): boolean {

        this.selected = !this.selected;
        if (this.selected == true)
         {
            if (!this.mydata) 
             {
              this.serv.insertFav(fav).subscribe((res) => {
                console.log(res);  });

             }

            else 
            {
              let updateStatus = {
                "userId":fav.userid,  
                "status": true
            }
            
              this.serv.updateFav(this.mydata.id, updateStatus).subscribe((res: any) => { alert(res); });

            }
           return true;
        }
        else 
        {
            alert("inside else " + this.mydata.id);
            let updateStatus = { 
                "userId":fav.userid, 
                 "status": false
                 }
            this.serv.updateFav(this.mydata.id, updateStatus).subscribe((res: any) => {
                alert(res);
            });
            return false;
        }
    }
}
