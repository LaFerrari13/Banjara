import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../models/Category';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ProductsComponent } from "../products/products.component";
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/Products';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ProductsComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit{



  categories!: Category[];

  catSelected: boolean = false;

  catProds!: Product[];


  constructor(private catService: CategoryService, private http: HttpClient, private prodService: ProductService){

  }  


  ngOnInit(): void {
    this.getAllCats();
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

  

}
