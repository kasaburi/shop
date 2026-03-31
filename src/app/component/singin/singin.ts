import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToolsService } from '../../tools-service';





@Component({
  selector: 'app-singin',
  standalone: true,  
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './singin.html',
  styleUrls: ['./singin.css']   
})
export class Singin {

  router = inject(Router);

  constructor(public tools: ToolsService) {}

  public img: string = "https://cdn-icons-png.flaticon.com/128/17502/17502159.png";
  public successMessage: string = '';
  public errorMessage: string = '';
  public loginFormInfo: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });





login() {
  this.tools.signin(this.loginFormInfo.value).subscribe({
    next: (data: any) => {
      console.log("this is", data);
      sessionStorage.setItem("user", data.access_token);
      this.successMessage = "✅ Successfully authenticated.";
      this.router.navigate(['product']);
    },
    error: (err) => {
      console.error("Login error:", err);
      this.errorMessage="Authorization failed."
    }
  });
}







}

