import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToolsService } from '../../tools-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-singup',
  standalone: true, 
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './singup.html',
  styleUrls: ['./singup.css'],
})
export class Singup {
  registerForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  public img: string = "https://api.dicebear.com/7.x/pixel-art/svg?seed=Jane";


  constructor(
    private fb: FormBuilder,
    private tools: ToolsService,
    private router: Router
  ) {

    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }


  public formInfo: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    age: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    phone: new FormControl(''),
    zipcode: new FormControl('', Validators.required),
    avatar: new FormControl('', Validators.required)
  });





register() {
  if (this.formInfo.invalid) {
     this.errorMessage = "Please fill in all required fields. ❌";
    return;
  }

  this.tools.signup(this.formInfo.value).subscribe(
    (data: any) => {
      console.log("რეგისტრაციის პასუხი:", data);
      if (data) {
       this.successMessage = "✅Registration is successful. !";
      } else {
        alert("Registration failed ❌");
      }
    },
    (err) => {
      console.error(err);
       this.errorMessage =  "Registration failed ❌";
    }
  );
}
}
