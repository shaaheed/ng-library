import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppColorPickerComponent } from './app-colorpicker.component';

@NgModule({
  declarations: [
    AppColorPickerComponent
  ],
  imports: [
    BrowserModule
  ],
  exports: [
    AppColorPickerComponent
  ]
})
export class AppColorPickerModule { }
