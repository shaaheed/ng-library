import { Component, ViewEncapsulation, Input, OnInit } from '@angular/core';
import { SelectAppControl } from '../select-app-control';

@Component({
  selector: 'app-select',
  templateUrl: './app-select.component.html',
  styleUrls: ['./app-select.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppSelectComponent extends SelectAppControl implements OnInit {

  @Input() items: any[] = [];
  @Input() placeholder: string;
  selectedValue: any;
  selectedDisplayValue: any;

  private originalItems: any[] = [];

  ngOnInit() {
    this.originalItems = JSON.parse(JSON.stringify(this.items));
    this.selectedDisplayValue = this.placeholder || 'Select';
  }

  clearSearch() {
    this.items = this.originalItems;
  }

  inputSearch(e) {
    let searchTerm = e.target.value;
    if (searchTerm === '' || searchTerm === null || searchTerm === undefined) {
      this.items = this.originalItems;
    } else {
      searchTerm = searchTerm.toLowerCase();
      this.items = this.originalItems.filter(x => x[this.displayProp].toLowerCase().indexOf(searchTerm) > -1);
    }
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
  }

  getDisplayValue(item) {
    return item[this.displayProp];
  }

  isSelected(item) {
    return this.selectedValue === item[this.valueProp];
  }

}