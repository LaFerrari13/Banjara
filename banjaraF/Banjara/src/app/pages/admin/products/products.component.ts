import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../../models/Products';
import { ProductService } from '../../../services/product.service';
import { HttpClient } from '@angular/common/http';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../models/Category';
import { ProductcardComponent } from '../productcard/productcard.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ProductcardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent implements OnInit {


  @Input({ required: false })
  catproducts!: Product[];


  productForm!: FormGroup;
  newProductTableVisible: boolean = false;
  
  products!: Product[];

  categories!: Category[];

  cat: Category = {
    name: "",
    id: 0,
    parentId: 0
  }


  product: Product = {
    id: 0,
    name: '',
    img: '',
    price: 0,
    category: this.cat
  }


  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private productService: ProductService, private catService: CategoryService, private cdr: ChangeDetectorRef){}


  ngOnInit(): void{
    this.productForm = this.fb.group({
      category: ['', [Validators.required]],
      price: ['', [Validators.required]],
      name: ['', [Validators.required]],
      image: ['', [Validators.required]]
    });



    
    if(this.catproducts){
      console.log("cat prods exist!")
      this.products = this.catproducts;
    }
    else{
      
      this.getAllCats();
      this.getAllProducts();
    }



    


 
    
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


  getAllProducts(): void{
    this.productService.getAllProducts().subscribe(
      (response: Product[])=>{
        this.products = response;
        for(const pd of this.products){

          pd.img = `data:image/jpeg;base64,${pd.img}`

        }

        this.cdr.markForCheck();

        console.log(`all prods loaded!`);
      }
    )
  }


  onSubmit(): void{
    console.log('submitted');


    
    

    if(this.productForm.valid && this.selectedFile){

      console.log("form valid, creating admin");
      this.product.name = this.productForm.value.name;
      this.cat.id = this.productForm.value.category;
      this.product.category = this.cat;
      this.product.price = this.productForm.value.price;
      this.product.img = '';
      

      
      console.log(this.product);

      console.log(`image of pd: ${this.product.img}`);
      this.createProduct(this.product);
    }

    else{
      alert("No file selected!");
    }

  }

  fileSelect(event: any): void{

    this.selectedFile = event.target.files[0];

  }

  createProduct(pd: Product): void{

    this.productService.createProduct(pd).subscribe(
      (response: Product)=>{
        console.log("Product created!");
        if(this.selectedFile){
          this.productService.addProductPfp(response.id, this.selectedFile).subscribe((rep: Product)=>{
            console.log("picture added!");
            console.log(rep.img);
            this.getAllProducts();
          })
        }
      }
    )


    
  }
  
  renderCheck(id: number): void{
    console.log("rendered " );
    
    
  }
  

}
