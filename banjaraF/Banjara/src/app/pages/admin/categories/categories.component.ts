import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../models/Category';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ProductsComponent } from "../products/products.component";
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/Products';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ProductsComponent, ReactiveFormsModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit{


  newCategoryTableVisible: boolean = false;

  categories!: Category[];

  catSelected: boolean = false;

  catProds!: Product[];


  catSave: Category = {
    name: "",
    id: 0,
    parentId: 0
  }


  catForm!: FormGroup;

  constructor(private catService: CategoryService, private http: HttpClient, private prodService: ProductService, private fb: FormBuilder){

  }  


  ngOnInit(): void {
    this.getAllCats();





    this.catForm = this.fb.group({
      parentId: [0, [Validators.required]],
      name: ['', [Validators.required]],
      
    });


  }


  getAllCats(): void{
    this.catService.getAllCategories().subscribe(
      (cats: Category[])=>{
        this.categories = cats;
        console.log("categories successfully fetched!");
        console.log(this.categories);
      },
      (Error)=>{
        console.log("oops");
      }
    )
  }


  onCategorySelect(cat: Category): void{
    
    this.prodService.getProductsByCategory(cat.id).subscribe(
      (resp: Product[])=>{
        this.catProds = resp;
        console.log("cat prods loaded!");
        for(const pd of this.catProds){
          pd.img = `data:image/jpeg;base64,${pd.img}`
        }
        this.catSelected = true;
      }
    )


  }


  onSubmit(): void{
    console.log('submitted');


    
    

    if(this.catForm.valid){

      console.log("form valid, creating category");

      this.catSave.name = this.catForm.value.name;
      if(!this.catForm.value.parentId){
        this.catSave.parentId = 0;
      }
      else{
        this.catSave.parentId = this.catForm.value.parentId;
      }
      
      this.createCategory(this.catSave);
    }

  }

  createCategory(cat: Category): void{
    this.catService.createCategory(cat).subscribe(
      (resp: Category)=>{
        console.log("SAVED ! CATEGORY SAVED!");
      },
      (er: Error)=>{
        console.log("some error :/");
      }
    )
  }

  

}
