import { Component, ViewEncapsulation, Input, OnInit, ElementRef } from '@angular/core';
import { SelectAppControl } from '../select-app-control';

@Component({
  selector: 'app-select',
  templateUrl: './app-select.component.html',
  styleUrls: ['./app-select.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppSelectComponent extends SelectAppControl implements OnInit {

  @Input() placeholder: string;
  selectedValue: any;
  selectedDisplayValue: any;

  constructor(ref: ElementRef) {
    super(ref);
  }

  ngOnInit() {
    this.init();
    this.selectedDisplayValue = this.placeholder || 'Select';
  }

  select(item) {
    if (item) {
      const value = item[this.valueProp];
      if (value !== undefined) {
        this.selectedValue = value;
      }
      const displayValue = item[this.displayProp];
      if (displayValue !== undefined) {
        this.selectedDisplayValue = displayValue;
      }
    }
    this.clearSearch();
  }

  getDisplayValue(item) {
    return item[this.displayProp];
  }

  isSelected(item) {
    return this.selectedValue === item[this.valueProp];
  }

}