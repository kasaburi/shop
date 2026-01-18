import { Component } from '@angular/core';
import { Singup } from '../singup/singup';
import { Singin } from '../singin/singin';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-auth',
  imports: [Singup,Singin,MatSnackBarModule],
  templateUrl: './auth.html',
   styleUrls: ['./auth.css']
})




export class Auth {

}
