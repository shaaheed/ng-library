import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppInputComponent } from './app-input.component';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    AppInputComponent
  ],
  imports: [
    BrowserModule
  ],
  exports: [
    AppInputComponent
  ]
})
export class AppInputModule { }
