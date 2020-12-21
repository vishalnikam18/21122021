import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Quiz } from '../models/quiz.model';
import { Observable } from 'rxjs';


const baseUrl = "http://localhost:8080/api/quizes";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private baseUrl1 = "http://localhost:8080/api/quizes/addQuize";
  constructor(private http: HttpClient) { }
  get(id: any): Observable<Quiz> {
    return this.http.get(`${baseUrl}/${id}`);
  }


 
  addQuize(question: Quiz): Observable<Quiz> {
    console.log(question, "This is a question");

    return this.http.post<Quiz>(this.baseUrl1, question, httpOptions);
  }

  getCategoryName() {
    return this.http.get("http://localhost:8080/api/quizes/getCategoryName");
  }
}
