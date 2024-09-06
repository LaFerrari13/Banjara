import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/Category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {


  private apiUrl = 'http://localhost:8080/api/banjara/category'; 

  category: Category = {
    name: "",
    id: 0,
    parentId: 0
  }

  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(`${this.apiUrl}`);
  }

  createCategory(cat: Category): Observable<Category>{
    return this.http.post<Category>(`${this.apiUrl}`, cat);
  }


}
