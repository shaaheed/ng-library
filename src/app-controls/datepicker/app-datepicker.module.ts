import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppDatePickerComponent } from './app-datepicker.component';

@NgModule({
  declarations: [
    AppDatePickerComponent
  ],
  imports: [
    BrowserModule
  ],
  exports: [
    AppDatePickerComponent
  ]
})
export class AppDatePickerModule { }
