import { Component, inject, signal, } from '@angular/core';
import {  RouterOutlet } from '@angular/router';
import { Header,} from './component/header/header';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Footer } from './component/footer/footer';
import {  ViewChild } from '@angular/core';



@Component({
  selector: 'app-root',
  imports: [Header,RouterOutlet,Footer,ReactiveFormsModule,],
  templateUrl: './app.html',
  styleUrl: './app.css',

})
export class App {
  protected readonly title = signal('shoping');
  private  fb = inject (FormBuilder);
  public form:FormGroup|undefined;



 @ViewChild('headerComp') headerComp!: Header;



}
