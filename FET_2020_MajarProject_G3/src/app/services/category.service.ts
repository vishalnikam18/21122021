import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';

const url = "http://localhost:8080/api/categories";
const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  
  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(url);
  }
}
