import { Component, OnInit } from '@angular/core';
import { Admin } from '../../../models/Admin';
import { AdminService } from '../../../services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {




  constructor(private adminService: AdminService, private router: Router){}


  admin : Admin = {
    id: 0,
    email: '',
    password: '',
    name: '',
    img: ''
  }

  

  selectedFile: File | null = null;


  //rendered image instance below
  adminImage: string | ArrayBuffer | null = '';

  ngOnInit(): void {
    this.admin.id = this.adminService.admin.id;
    this.admin.email = this.adminService.admin.email;
    this.admin.password = this.adminService.admin.password;
    this.admin.name = this.adminService.admin.name;
    // this.admin.img = this.adminService.admin.img;
    
    // console.log(typeof(this.adminService.admin.img));
    
    this.loadAdminImage(this.admin.id);
    console.log(this.admin.img);
  }


  onFileSelect(event: any): void{


    
    this.selectedFile = event.target.files[0];
    
    if(this.selectedFile != null){
      console.log("File selected! Uploading..."); 
      this.adminService.addAdminPfp(this.admin.id, this.selectedFile).subscribe(
        response=> {
          console.log("image saved");
        },
        error=>{
          console.log("Couldnt save iamge");
        }
        
      )
    }

    

  }




  loadAdminImage(adminId: number): void {
    console.log("admin id: " +adminId);
    this.adminService.getAdminPfp(adminId).subscribe(response => {
      console.log("new http req: " + response.arrayBuffer());
      const reader = new FileReader();
      reader.readAsDataURL(response);
      reader.onloadend = () => {
        this.adminImage = reader.result;
      };
    });
  }

  logout(): void{
    this.adminService.clearAdminFromLocalStorage();

    this.router.navigateByUrl('/adminlogin')
  }
  


}
