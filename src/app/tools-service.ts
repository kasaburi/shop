import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Injectable,inject } from '@angular/core';
import { Router, } from '@angular/router';
import {  Observable,  BehaviorSubject,  } from 'rxjs';









export interface CartItem {
  id: string;
  title: string;
  image?: string;
  price: number;
  quantity: number;
  stock?: number;
  rating?: number;
  reviews?: number;
}


export interface CartResponse {
  items: CartItem[];
}


interface AuthResponse {
  access_token: string;
}



@Injectable({ providedIn: 'root' })
export class ToolsService {

  public routeri= inject(Router)

  constructor(public http: HttpClient, public router: Router) {}

   private cartItemsSubject = new BehaviorSubject<any[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();
  private baseUrl = 'https://api.everrest.educata.dev/shop/products/search';
  public apiUrl ="https://api.everrest.educata.dev/shop/products/all";
  private tokenSubject = new BehaviorSubject<string | null>(sessionStorage.getItem("token"));

  token$ = this.tokenSubject.asObservable();




















getProductsAll(page: number = 1, page_size: number = 6): Observable<any> {
  return this.http.get(
    `https://api.everrest.educata.dev/shop/products/all?page_index=${page}&page_size=${page_size}`
  );
}




  getAllProducts(page: number = 1) {
    return this.getProductsAll(page);
  }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>('https://api.everrest.educata.dev/shop/products/categories');
  }



  getBrends(): Observable<any[]> {
    return this.http.get<any[]>('https://api.everrest.educata.dev/shop/products/brands');
  }

  getByBrends(brand: string, page: number = 1) {
    return this.http.get(
      `https://api.everrest.educata.dev/shop/products/brand/${brand}?page_index=${page}&page_size=6`
    );
  }

  getByCategory(categoryId: number | null, page: number): Observable <any> {
    return this.http.get(
      `https://api.everrest.educata.dev/shop/products/category/${categoryId}?page_index=${page}&page_size=6`
    );
  }

  filtercategory(id: any) {
    return this.http.get(`https://api.everrest.educata.dev/shop/products/category/${id}`);
  }

  getProductsId(id: string | null) {
    return this.http.get(`https://api.everrest.educata.dev/shop/products/id/${id}`);
  }














// Cart..........









getFilteredProducts(filters: any) {
  const baseUrl = "https://api.everrest.educata.dev/shop/products/search";
  const params: string[] = [];

  for (const key in filters) {
    const val = filters[key];
    if (val !== '' && val !== null && val !== undefined && key !== 'rating') {
      params.push(`${encodeURIComponent(key)}=${encodeURIComponent(val)}`);
    }
  }

  const url = params.length ? `${baseUrl}?${params.join('&')}` : baseUrl;
  console.log('Requesting:', url);

  return this.http.get(url);
}




  getUser(): Observable<any> {
    return this.http.get('https://api.everrest.educata.dev/auth', );
  }





  updateCart(body: { id: string; quantity: number }): Observable<any> {
    return this.http.patch('https://api.everrest.educata.dev/shop/cart/product', body, {
      headers: this.getAuthHeaders()
    });
  }

  getCart(): Observable<any> {
    return this.http.get('https://api.everrest.educata.dev/shop/cart', {
      headers: this.getAuthHeaders()
    });
  }


getCartItems() {
  const token = localStorage.getItem('token');
  return this.http.get('https://api.everrest.educata.dev/shop/cart/product', {
    headers: { Authorization: `Bearer ${token}` }
  });
}

addToCart(body: any) {
  const token = localStorage.getItem('token');
  return this.http.post('https://api.everrest.educata.dev/shop/cart/product', body, {
    headers: { Authorization: `Bearer ${token}` }
  });
}




  setToken(token: string) {
    sessionStorage.setItem('token', token);
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  setUserInfo(user: any) {
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  getUserInfo(): any | null {
    const u = sessionStorage.getItem('user');
    return u ? JSON.parse(u) : null;
  }

  Token(token: string): any | null {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return { id: payload._id, email: payload.email };
    } catch {
      return null;
    }
  }



  signin(info: any): Observable<any> {
    return this.http.post('https://api.everrest.educata.dev/auth/sign_in', info);
  }

  signup(info: any): Observable<any> {
    return this.http.post('https://api.everrest.educata.dev/auth/sign_up', info);
  }

  signout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    this.router.navigate(['home']);
  }

public getAuthHeaders(): HttpHeaders {
  const token = this.getToken();
  if (!token) console.warn("⚠️ Token ვერ მოიძებნა sessionStorage-ში");
  return new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });

}


}











