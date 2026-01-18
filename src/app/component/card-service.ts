import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Productall } from '../component/interface';
import { CartItem } from '../modals/card.interface';




@Injectable({ providedIn: 'root' })
export class CardService {








private cartOpen = new BehaviorSubject<boolean>(false);
cartOpen$ = this.cartOpen.asObservable();
public basUrl="https://api.everrest.educata.dev/shop/cart/product"
  private cartItemsSubject = new BehaviorSubject<CartItem[]>(this.loadCart());
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor() {
    window.addEventListener('storage', () => {
      this.cartItemsSubject.next(this.loadCart());
    });
  }

  private loadCart(): CartItem[] {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  }

  private saveCart(items: CartItem[]) {
    localStorage.setItem('cart', JSON.stringify(items));
    this.cartItemsSubject.next(items);
  }

  addToCart(product: Productall) {
    if (product.stock === 0) return;

    const existing = this.cartItemsSubject.value.find(
      item => item.product._id === product._id
    );

    let updated: CartItem[];
    if (existing) {
      updated = this.cartItemsSubject.value.map(item =>
        item.product._id === product._id && item.quantity < product.stock
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updated = [...this.cartItemsSubject.value, { product, quantity: 1 }];
    }

    this.saveCart(updated);
  }






  removeFromCart(productId: string) {
    const updated = this.cartItemsSubject.value.filter(item => item.product._id !== productId);
    this.saveCart(updated);
  }

  increaseQuantity(productId: string) {
    const updated = this.cartItemsSubject.value.map(item =>
      item.product._id === productId && item.quantity < item.product.stock
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    this.saveCart(updated);
  }

  decreaseQuantity(productId: string) {
    const updated = this.cartItemsSubject.value
      .map(item =>
        item.product._id === productId ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter(item => item.quantity > 0);
    this.saveCart(updated);
  }

  clearCart() {
    localStorage.removeItem('cart');
    this.cartItemsSubject.next([]);
  }

  getTotalPrice(): number {
    return this.cartItemsSubject.value.reduce(
      (acc, item) => acc + item.product.price.current * item.quantity,
      0
    );
  }




  toggleCart(isOpen: boolean) {
    this.cartOpen.next(isOpen);
  }



  







}

