import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Admin } from '../models/Admin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:8080/api/banjara/admins'; // Update with your Spring Boot API URL

  public admin: Admin = {
    id: 0,
    email: '',
    password: '',
    name: '',
    img: ''
  }



  constructor(private http: HttpClient){
    this.loadAdminFromLocalStorage();
    console.log(`admin i: ${this.admin.id}`)
    console.log("admin service kicked in")
  }



  public saveAdminToLocalStorage(admin: Admin): void{
    
    localStorage.setItem('admin', JSON.stringify(admin));
  }

  private loadAdminFromLocalStorage(): void{
    const storedAdmin = localStorage.getItem('admin');
    if(storedAdmin){
      this.admin = JSON.parse(storedAdmin);
      console.log(`admin loaded: ${this.admin.id}`)
    }
    else{
      console.log("storage empty");
    }
  }


  public clearAdminFromLocalStorage(): void {
    localStorage.removeItem('admin');
  }


 
  createAdmin(admin : Admin): Observable<Admin>{

    // no need for form data since we're only creating the user
    // without a pfp with this endpoint

  
    return this.http.post<Admin>(`${this.apiUrl}`, admin);
  }

  addAdminPfp(adminId: Number, imgFile : File): Observable<Admin>{
    const formData = new FormData();
    formData.append('img', imgFile);
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    console.log("In the admin service layer, sending the req  ");
    
    

    return this.http.post<Admin>(`${this.apiUrl}/pfp/${adminId}`, formData, { headers });
   
    
  }


  getAdminPfp(adminId : number): Observable<Blob>{
    return this.http.get(`${this.apiUrl}/pfp/${adminId}`, { responseType: 'blob' });
  }


  adminLogin(admin: Admin): Observable<Admin>{

    return this.http.post<Admin>(`${this.apiUrl}/login`, admin);

  }


  //okay so there's two diff methods of implementing images then, one method is recieving it along with the whole admin object, in this case the login function subscribes to the login func in this file, this way it receives all values of admin including img, the admin instance in this file, its values can be set to the values received with the subscription, the img will be a STRING, a string without proper formatting
  // this.adminService.admin.img = `data:image/jpeg;base64,${admintemp.img}`; this code makes it into proper formatting and readies it for rendering in an html page so string method works ~~~~~~
  // the other method involves using a unique endpoint just for retrieiving the image, in this case the image is sent as Blob, there is a function in this service file just for that and at the moment tin the project, the profile component subscribes to it since the image doesn't necessarily need to be rendered after login, so this blob received is read using a FileReader instance using .readAsDataURL and then rendered. At the moment the whole project SHOULD be using the second, blob approach.


}
