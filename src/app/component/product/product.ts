import { Component, Output,OnInit, EventEmitter } from '@angular/core';
import { Router, RouterModule,  } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToolsService } from '../../tools-service';
import {  FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CardService } from '../card-service';
import { Productall } from "../interface"
import { __values } from 'tslib';


@Component({
  selector: 'app-product',
  imports: [RouterModule, CommonModule, ReactiveFormsModule,],
  templateUrl: './product.html',
  styleUrl: './product.css'

})




export class Product  implements OnInit  {




public img1:string="https://img.icons8.com/?size=96&id=NgYyTKlnn4kP&format=png";
  public image: string = "https://i.imgur.com/RXROBLE.jpg";
  public allProducts: any[] = [];
  public categories: any[] = [];
  public brands: string[] = [];
  public pageList: number[] = [];
  public myPageIndex: number = 1;
  public selectedCategory: number | null = null;

  public showPopup = false;
  public showBrands = false;
  public showCategories = false;
  public product: any = {};
  public products: any[] = [];
  public cartItems: any[] = [];
  public selectedBrand: string | null = null;
  public selectedCategoryName: string | null = null;
  public productall: Product[] = [];
  public showCart = false;
  public filterForm: FormGroup;
selectedSort: string = ''; 

rating:string=""
  @Output() cartUpdated = new EventEmitter<void>();

  constructor( private tools: ToolsService,private fb: FormBuilder,private router: Router,private card: CardService) {
    this.filterForm = this.fb.group({
      page_index: [1],
      page_size: [6],
      keywords: [''],
      category_id: [''],
      brand: [''],
      rating: [''],
      price_min: [''],
      price_max: [''],
      sort_by: [''],       
      sort_direction: ['desc']    
    });

  this.filterForm.valueChanges.subscribe(() => {
    this.filterForm.patchValue({ page_index: 1 }, { emitEvent: false });
    this.getFilteredProducts();
  });

  }
  ngOnInit(): void {
    this.getCategories();
    this.getBrands();
    this.getFilteredProducts();
    this.loadProducts();


    this.tools.getAllProducts().subscribe({
      next: (res: any) => {
        this.products = res;
      },
      error: (err) => console.error("❌ პროდუქტების წამოღების შეცდომა:", err)
    });


console.log("SessionStorage user:", sessionStorage.getItem("user"));
console.log("SessionStorage token:", sessionStorage.getItem("token"));


this.tools.getProductsAll(1).subscribe((res: any) => {
    this.allProducts = res.items;
  });









  

 this.tools.getAllProducts().subscribe({
    next: (res: any) => {
      this.allProducts = res.products || [];
      console.log("📦 პროდუქტები:", this.allProducts);
    },
    error: err => console.error(err)
  });

  }


  openPopup() {
    this.showPopup = true;
  }
  closePopup() {
    this.showPopup = false;
    this.showBrands = false;
    this.showCategories = false;
  }
  toggleBrands() {
    this.showBrands = !this.showBrands;
    this.showCategories = false;
  }
  toggleCategories() {
    this.showCategories = !this.showCategories;
    this.showBrands = false;
  }


  selectBrand(brand: string) {
    this.selectedBrand = brand;
    this.filterForm.patchValue({ brand: brand, page_index: 1 });
  }


  selectCategory(id: number, name: string) {
    this.selectedCategoryName = name;
    this.filterForm.patchValue({ category_id: id, page_index: 1 });
  }

  reset() {
    this.filterForm.reset({
      page_index: 1,
      page_size: 6,
      keywords: '',
      category_id: '',
      brand: '',
      rating: '',
      price_min: '',
      price_max: '',
      sort_by: '',
      sort_direction: 'desc'
    });
    this.selectedBrand = null;
    this.selectedCategoryName = null;
  }




  onImageError(event: Event) {
    (event.target as HTMLImageElement).src = this.image;
  }

 






  setupPagination(total: number, limit: number) {
    const pageNum = Math.ceil(total / limit);
    this.pageList = Array.from({ length: pageNum }, (_, i) => i + 1);
  }


  getCategories() {
    this.tools.getCategories().subscribe((data: any) => {
      this.categories = data;
    });
  }


  getBrands() {
    this.tools.getBrends().subscribe((data: any) => {
      this.brands = data;
    });
  }







changePage(page: number) {
  this.myPageIndex = page;
  this.filterForm.patchValue({ page_index: page }, { emitEvent: false });
  this.getFilteredProducts(); 
}








getFilteredProducts() {
  const filters = this.filterForm.value;
  const requestFilters: any = {};

  for (const key in filters) {
    const value = filters[key];
    if (value !== '' && value !== null && value !== undefined) {
      requestFilters[key] = value;
    }
  }

  delete requestFilters.rating;

  console.log("📤 Request filters:", requestFilters);

  this.tools.getFilteredProducts(requestFilters).subscribe({
    next: (res: any) => {
      const products = res.products || [];

      const pageSize = Number(filters.page_size) || 6;
      const pageIndex = Number(filters.page_index) || 1;
      this.setupPagination(res.total || products.length, pageSize);
      this.myPageIndex = pageIndex;

      this.allProducts = products;

      console.log('✅ Products sorted/filtered:', this.allProducts);
    },
    error: (err) => console.error('❌ Filter request failed:', err)
  });
}































loadProducts() {
  this.tools.getProductsAll(1).subscribe({
    next: (res: any) => {
      console.log("📦 პროდუქტების სია:", res);
      this.products = res.products; 
    },
    error: err => console.error("❌ პროდუქციის წამოღების შეცდომა:", err)
  });
}












 Products() {
    this.tools.getAllProducts().subscribe({
      next: (res: any) => {
        this.allProducts = res.products || [];
      },
      error: (err) => console.error(err)
    });
  }





  addToCart(product: Productall) {
    this.card.addToCart(product);
    console.log('Added to cart:', product);
  console.log("Stock value:", product.stock);

  }

}





























 