import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppControlModule } from '../app-controls/app-control.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppControlModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
