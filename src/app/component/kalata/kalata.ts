import { CommonModule } from '@angular/common';
import { Component,EventEmitter,Input,OnInit, Output } from '@angular/core';
import { ActivatedRoute, RouterModule, } from '@angular/router';
import { CardService,  } from '../card-service';
import { Productall } from '../interface';


export interface CartItem {
  product: Productall;
  quantity: number;
}


@Component({
  selector: 'app-kalata',
  imports: [RouterModule,CommonModule,],
  templateUrl: './kalata.html',
  styleUrl: './kalata.css',


})








export class Kalata implements OnInit {
 public orderStatus: string = '';
 public  defaultImage: string = "https://i.imgur.com/RXROBLE.jpg";
 public cartItems: CartItem[] = [];
  constructor(private router: ActivatedRoute,  public card: CardService) {}


  @Input() isOpen: boolean = false;
  @Output() closeAside = new EventEmitter<void>();



  ngOnInit() {
    this.card.cartItems$.subscribe(items => {
      this.cartItems = items;
    });


}


  

  trackById(index: number, item: CartItem) {
    return item.product._id;
  }

  close() {
    this.closeAside.emit();
  }





isLoggedIn(): boolean {
  return sessionStorage.getItem("user") !== null;
}

checkout() {
  if (!sessionStorage.getItem('user')) {
    alert("❌ Login is required to make a purchase");
    return;
  }

  this.orderStatus = 'Order completed successfully ✅';

  setTimeout(() => {
    this.card.clearCart(); 
    this.close();         
    this.orderStatus = ''; 
  }, 3000);
}



  onImageError(event: Event) {
    (event.target as HTMLImageElement).src = this.defaultImage;
  }







  increaseQuantity(productId: string) {
    this.card.increaseQuantity(productId);
  }

  decreaseQuantity(productId: string) {
    this.card.decreaseQuantity(productId);
  }

  removeFromCart(productId: string) {
    this.card.removeFromCart(productId);
  }

  getTotalPrice() {
    return this.card.getTotalPrice();
  }







}