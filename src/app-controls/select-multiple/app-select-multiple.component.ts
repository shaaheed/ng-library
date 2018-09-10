import { Component, ViewEncapsulation, Input, OnInit } from '@angular/core';
import { SelectAppControl } from '../select-app-control';

@Component({
  selector: 'app-select-multiple',
  templateUrl: './app-select-multiple.component.html',
  styleUrls: ['./app-select-multiple.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppSelectMultipleComponent extends SelectAppControl implements OnInit {

  @Input() items: any[] = [];
  @Input() placeholder: string;
  
  open = false;
  selectedItems: any[] = [];

  private originalItems: any[] = [];

  ngOnInit() {
    this.originalItems = JSON.parse(JSON.stringify(this.items));
    // this.selectedDisplayValue = this.placeholder || 'Select';
  }

  openDropdown(e) {
    this.open = true;
  }

  closeDropdown() {
    this.open = false;
  }

  toggleDropdown(e) {
    this.open = !this.open;
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
      if (!this.isExists(this.selectedItems, item)) {
        this.selectedItems.push(item);
      }
    }
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