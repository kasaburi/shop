import { Routes } from '@angular/router';
import { Auth } from './component/auth/auth';
import { Home } from './component/home/home';
import { Product } from './component/product/product';
import {  CardComponent } from './component/card/card';
import { authGuard } from './auth-guard';
import { Kalata } from './component/kalata/kalata';
import { Error } from './component/error/error';




export const routes: Routes = [

{
   path:"",
   component:Home,
    
  }, 


{
    path:"auth",
    component:Auth,
},
{
    path:"product",
    component:Product,
        
    
},


{
    path:'card/:id',
    component:CardComponent,
    title:"card",
},


{
    path:"kalata",
    component:Kalata,
    canActivate:[authGuard]

    
},


{
    path: "**",
    component: Error,
}

];

