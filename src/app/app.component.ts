import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor() {
    // super();
  }

  selectItems = [
    { id: 1, name: 'One', title: 'ONE' },
    { id: 2, name: 'Two', title: 'TWO' },
    { id: 3, name: 'Three', title: 'THREE' },
    { id: 4, name: 'Four', title: 'FOUR' },
    { id: 5, name: 'Five', title: 'FIVE' },
    { id: 6, name: 'Six', title: 'SIX' },
    { id: 7, name: 'Seven', title: 'SEVEN' },
    { id: 8, name: 'Eight', title: 'EIGHT' },
    { id: 9, name: 'Nine', title: 'NINE' },
    { id: 10, name: 'Ten', title: 'TEN' },
  ]

}
