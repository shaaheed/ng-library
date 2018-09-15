import { Component, ViewEncapsulation, Input, OnInit, ElementRef } from '@angular/core';
import { DropdownAppControl } from '../dropdown-app-control';

@Component({
  selector: 'app-colorpicker',
  templateUrl: './app-colorpicker.component.html',
  styleUrls: ['./app-colorpicker.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppColorPickerComponent extends DropdownAppControl implements OnInit {

  @Input() placeholder: string;

  private opacityHand;
  private opacityHandClicked = false;
  opacity;

  constructor(ref: ElementRef) {
    super(ref);

  }

  ngOnInit() {

    this.opacityHand = this.ref.nativeElement.getElementsByClassName("opacity-picker-hand")[0];
    const opacityPicker = this.ref.nativeElement.getElementsByClassName("opacity-outer")[0];
    
    opacityPicker.addEventListener('mousemove', (e) => {
      this.opacityPickerClick(e);
    })

  }

  opacityPickerClick(e) {
    const width = e.currentTarget.clientWidth;
    const clientX = e.clientX - 10;
    this.opacity = Math.floor((clientX / width) * 100);
    console.log('opacity', this.opacity);
  }

  makeMovable(el) {

    let initX, initY, mousePressX, mousePressY;

    el.addEventListener('mousedown', (e) => {

      initX = e.currentTarget.offsetLeft;
      initY = e.currentTarget.offsetTop;
      mousePressX = e.clientX;
      mousePressY = e.clientY;

      el.addEventListener('mousemove', (e) => {
        this.opacity = initX + e.clientX - mousePressX + 'px';
      }, false);

      // window.addEventListener('mouseup', () => {
      //   contextmenu.removeEventListener('mousemove', repositionElement, false);
      // }, false);

    }, false);
  }

  mouseDrag() {

  }

}