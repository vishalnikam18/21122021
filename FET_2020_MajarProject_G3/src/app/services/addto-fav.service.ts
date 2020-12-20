import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddtoFavService {
  constructor(private http: HttpClient) {}
  getFavListOfUser(uid: number) {
    return this.http.get('http://localhost:8080/api/fav/favourite/' + uid);
  }
  getFavList(Uid: any, quid: any) {
    return this.http.get(
      'http://localhost:8080/api/fav/favourite/' + Uid + '/' + quid
    );
  }
  updateFav(id: any, status: any) {
    console.log(status);

    return this.http.put('http://localhost:8080/api/fav/' + id, status);
  }
  insertFav(fav: any) {
    return this.http.post('http://localhost:8080/api/fav', fav);
  }
  getMyFavlist(uid: any) {
    return this.http.get('http://localhost:8080/api/fav/' + uid);
  }
}
