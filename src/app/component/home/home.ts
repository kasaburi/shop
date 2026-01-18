import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { ToolsService } from '../../tools-service';





@Component({
  selector: 'app-home',
  imports: [RouterModule,CommonModule],
  templateUrl: './home.html',
   styleUrls: ['./home.css'],
})

export class Home   implements OnInit {


 showPopup = false;
  public allProduct: any[] = [];
  public loading: boolean = true;
  public error: string = '';
public userInfo:object={}; 
  constructor(private tools: ToolsService) {}

  ngOnInit(): void {
    console.log('ngOnInit called');
    this.allCard();

  const isVisited = localStorage.getItem('visited');
    if (!isVisited) {
      this.showPopup = true;
      localStorage.setItem('visited', 'true');
    }


 



    this.tools.getUser().subscribe((data:any)=>{
      console.log(data); 
      this.userInfo=data.firstName; 
      console.log("info", this.userInfo)
    })
    
  


      setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
      this.currentImage = this.images[this.currentIndex];
    }, 6000); 
  }


 closePopup() {
    this.showPopup = false;
    localStorage.setItem('visited', 'true');
  }

  allCard(): void {
    this.tools.getAllProducts().subscribe({
      next: (data: any) => {
        console.log('მიღებული მონაცემები:', data); 
        this.allProduct = data.products;
        this.loading = false;
      },
      error: (err) => {
        console.error('API error:', err);
        this.error = 'პროდუქტების წამოღება ვერ მოხერხდა';
        this.loading = false;
      }
    });
  }
  
  images: string[] = [
    'https://global.aorus.com/upload/Product/F_20230320143519PftFfe.JPG',
    "https://www.pbtech.co.nz/fileslib/_20240510112418_157.jpg",

  ];

  currentIndex: number = 0;
  currentImage: string = this.images[0];


}



