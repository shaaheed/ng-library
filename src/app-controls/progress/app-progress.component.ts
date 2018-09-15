import { Component, ViewEncapsulation, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './app-progress.component.html',
  styleUrls: ['./app-progress.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppProgressComponent {

  @Input() min: number = 0;
  @Input() max: number;
  @Input() now: number = 0;

  constructor(ref: ElementRef) {
    //
  }

}