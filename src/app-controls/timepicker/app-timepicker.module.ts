import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppTimePickerComponent } from './app-timepicker.component';

@NgModule({
  declarations: [
    AppTimePickerComponent
  ],
  imports: [
    BrowserModule
  ],
  exports: [
    AppTimePickerComponent
  ]
})
export class AppTimePickerModule { }
