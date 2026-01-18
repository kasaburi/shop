import { Component,OnInit } from '@angular/core';
import {  RouterModule, } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToolsService } from '../../tools-service';
import { CardService } from '../card-service';
import { Kalata } from "../kalata/kalata";




@Component({
  selector: 'app-header',
   imports: [RouterModule, CommonModule, Kalata],
  templateUrl: './header.html',
  styleUrls: ['./header.css'], 
})



export class  Header implements OnInit {
  public basket: string = "https://cdn-icons-png.flaticon.com/128/8071/8071121.png";
  cartItems: any[] = [];
  isCartOpen: boolean = false;
  public img:string="https://cdn-icons-png.flaticon.com/128/3690/3690666.png";
  public image:string="https://cdn-icons-png.flaticon.com/128/1000/1000946.png";
  menuOpen: boolean = false;


  userToken: string | null = sessionStorage.getItem('user');
 constructor(private tools:ToolsService,  private http: CardService ) {
   
  
 }
  ngOnInit() {
 
    this.http.cartOpen$.subscribe((isOpen) => {
      this.showCart = isOpen;
    });

  }




showCart = false;


 toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }




  toggle() {
    this.showCart = !this.showCart;
  }



  toggleCart() {
    this.showCart = !this.showCart;
    this.http.toggleCart(this.showCart);
  }


isLoggedIn(): boolean {
  return sessionStorage.getItem("user") !== null;
}




  signout():void{
    this.tools.signout()
  }


 





  
  



  







}





 




























 



















































