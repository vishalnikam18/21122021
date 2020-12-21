import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameServiceService {

  constructor(private _http: HttpClient) { }

  getGames(): Observable<any[]> {
    return this._http.get<any[]>('http://localhost:4000/game');
  }
  postGames(game:any): Observable<any[]> {
    console.log('Inside Games post Method!!!!', game);

    return this._http.post<any[]>('http://localhost:4000/game', game);
  }
}
