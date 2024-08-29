import { Injectable } from '@angular/core';
import { Product } from '../models/Products';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/Category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:8080/api/banjara/products'; 


  cat: Category = {
    name: "",
    id: 0,
    parentId: 0
  }

  public product: Product = {
    id: 0,
    name: '',

    price: 0,
    img: '',
    category: this.cat
  }



  constructor(private http: HttpClient){
    
    
    
  }



  getAllProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.apiUrl}`);
  }



 
  createProduct(product : Product): Observable<Product>{

    // no need for form data since we're only creating the user
    // without a pfp with this endpoint

  
    return this.http.post<Product>(`${this.apiUrl}`, product);
  }

  addProductPfp(productId: Number, imgFile : File): Observable<Product>{
    const formData = new FormData();
    formData.append('img', imgFile);
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    console.log("In the product service layer, sending the req  ");
    
    

    return this.http.post<Product>(`${this.apiUrl}/img/${productId}`, formData, { headers });
   
    
  }


  getProductPfp(productId : number): Observable<Blob>{
    return this.http.get(`${this.apiUrl}/img/${productId}`, { responseType: 'blob' });
  }


  getProductsByCategory(catId: number): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.apiUrl}/category/${catId}`);
  }

  


  

}
