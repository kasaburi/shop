import { Component,EventEmitter,Input,OnInit,  } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ToolsService } from '../../tools-service';
import { CommonModule } from '@angular/common';
import { CardService } from '../card-service';
import { Productall } from "../interface"

@Component({
  selector: 'app-card',
  imports: [RouterModule,CommonModule,],
  templateUrl: './card.html',
  styleUrl: './card.css'
})




export class CardComponent implements OnInit {
  productId: string = '';
  product: any;
  image: string = "https://i.imgur.com/RXROBLE.jpg";
  currentImageIndex: number = 0;
  userToken: string | null = sessionStorage.getItem('user');
  constructor(private route: ActivatedRoute, private tools: ToolsService, private card: CardService) {}


  @Input() products!: Productall; 












ngOnInit(): void {
  const id = this.route.snapshot.paramMap.get('id') || '';
  if (id) {
    this.tools.getProductsId(id).subscribe({
      next: (res: any) => {
        this.product = res;
      },
      error: (err) => console.error(err)
    });
  }




}


 addToCart(product: Productall) {
    this.card.addToCart(product);
    console.log('Added to cart:', product);
  }










  prevImage() {
    if (!this.product?.images?.length) return;
    this.currentImageIndex =
      (this.currentImageIndex - 1 + this.product.images.length) % this.product.images.length;
  }

   onImageError(event: Event) {
    (event.target as HTMLImageElement).src = this.image;
  }
  nextImage() {
    if (!this.product?.images?.length) return;
    this.currentImageIndex =
      (this.currentImageIndex + 1) % this.product.images.length;
  }

 
}


