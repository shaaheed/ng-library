import { Component, ViewEncapsulation, ElementRef } from '@angular/core';
import { InputAppControl } from '../input-app-control';

@Component({
  selector: 'app-input',
  templateUrl: './app-input.component.html',
  styleUrls: ['./app-input.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppInputComponent extends InputAppControl {

  message = 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'

  constructor(ref: ElementRef) {
    super(ref);
  }

}