import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Quize }  from './models/Search.model';
const baseUrl = 'http://localhost:8080/api/qz';
@Injectable({
  providedIn: 'root'
})
export class SearchService {
  
  constructor(private http: HttpClient) { }
  getAll(): Observable<Quize[]> {
    return this.http.get<Quize[]>(baseUrl);
  }

  findByTitle(quizname: any): Observable<Quize[]> {
    return this.http.get<Quize[]>(`${baseUrl}?quizname=${quizname}`);
  }
}
