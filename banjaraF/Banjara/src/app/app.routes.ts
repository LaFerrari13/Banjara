import { Routes } from '@angular/router';
import { LoginComponent } from './pages/admin/login/login.component';
import { LayoutComponent } from './pages/admin/layout/layout.component';
import { ProductsComponent } from './pages/admin/products/products.component';
import { SignupComponent } from './pages/admin/signup/signup.component';
import { ProfileComponent } from './pages/admin/profile/profile.component';
import { CategoriesComponent } from './pages/admin/categories/categories.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'adminlogin',
        pathMatch:'full'
    },
    {
        path:'adminlogin',
        component:LoginComponent
    },
    {
        path: 'signup',
        component: SignupComponent
    },
    {
        //now even tho this is the second path with this path,
        //tis isnt for redirection
        //its only there to 'help' render children components
        path:'admin',
        component:LayoutComponent,
        children:[
            {
                //now basically what this is doing is that when you're routed to /products, 
                //Layout component will be first loaded and then products component
                //whatever children of layout you specificy, they can be rendered inside the Layout
                // so if you have a component with path /mainView, when you go to it
                //say http://localhost:4200/mainView 
                // main view comp will be loaded inside Layout even if Layout isn't specified in path it 
                // will be loaded
                path:'products',
                component: ProductsComponent
            },
            {
                path:'profile',
                component: ProfileComponent
            },
            {
                path: 'categories',
                component: CategoriesComponent
            }
            
        ]
    }
];
