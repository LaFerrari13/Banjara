import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Admin } from '../../../models/Admin';
import { AdminService } from '../../../services/admin.service';
import { TestComponent } from "../test/test.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FormsModule, TestComponent, TestComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {


  constructor(private adminService: AdminService, private router: Router){}


  admin: Admin = {
    id: 0,
    email: '',
    password: '',
    name: '',
    img: ''
  }



  onSubmit(): void{
    this.adminService.adminLogin(this.admin).subscribe(
      (admintemp : Admin)=> {
        console.log("admin login successful");
        this.adminService.admin.id = admintemp.id;
        this.adminService.admin.email = admintemp.email;
        this.adminService.admin.password = admintemp.password;
        this.adminService.admin.name = admintemp.name;
        this.adminService.saveAdminToLocalStorage(this.adminService.admin);
        // this.adminService.admin.img = admintemp.img;
        // this.adminService.admin.img = `data:image/jpeg;base64,${admintemp.img}`;


        this.router.navigateByUrl('/admin/profile')
      },
      error=>{
        console.error('Error while logging in');
        alert('Sorry');
      }
    )
  }


}
