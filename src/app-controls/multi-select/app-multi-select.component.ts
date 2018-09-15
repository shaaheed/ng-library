import { Component, ViewEncapsulation, Input, OnInit, ElementRef } from '@angular/core';
import { SelectAppControl } from '../select-app-control';

@Component({
  selector: 'app-multi-select',
  templateUrl: './app-multi-select.component.html',
  styleUrls: ['./app-multi-select.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppMultiSelectComponent extends SelectAppControl implements OnInit {

  @Input() placeholder: string;

  selectedItems: any[] = [];

  constructor(ref: ElementRef) {
    super(ref);
  }

  ngOnInit() {
    this.init();
  }

  select(item) {
    if (item) {
      if (!this.isExists(this.selectedItems, item)) {
        this.selectedItems.push(item);
      }
    }
    this.clearSearch();
  }

  remove(item) {
    const indexOf = this.selectedItems.indexOf(item);
    this.selectedItems.splice(indexOf, 1);
  }

  getDisplayValue(item) {
    return item[this.displayProp];
  }

  isSelected(item) {
    return this.isExists(this.selectedItems, item);
  }

  isExists(items: any[], item: any) {
    return items.filter(x => x[this.valueProp] === item[this.valueProp]).length > 0;
  }

  hasSelectedItems() {
    return this.selectedItems.length > 0
  }

}