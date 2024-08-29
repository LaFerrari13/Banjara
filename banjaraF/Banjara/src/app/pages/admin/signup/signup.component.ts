import { Component, NgModule } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Admin } from '../../../models/Admin';
import { FormBuilder, FormGroup, FormsModule, NgForm, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../services/admin.service';



@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink,
    RouterLinkActive,
    RouterOutlet,
    CommonModule,
    ReactiveFormsModule,

    
    
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {


  adminForm!: FormGroup;

  stockImagePath: string = 'material/userpic.jpg';


  constructor(private fb: FormBuilder, private adminService: AdminService){}


  ngOnInit(): void{
    this.adminForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      name: ['', [Validators.required]]
    });
  }


  

  onSubmit(): void{

    console.log('submitted');

    if(this.adminForm.valid){

      console.log("form valid, creating admin");
      const admin = this.adminForm.value;
      console.log(admin.value);
      

      this.signUp(admin);
    }
  }


  

  
   signUp(admin: any): void{
    this.adminService.createAdmin(admin).subscribe(
      response=> {
        console.log("admin created");
      },
      error=>{
        console.error('Error while creaating admin');
      }
    )
  }



}
