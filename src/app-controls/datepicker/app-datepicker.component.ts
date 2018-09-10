import { Component, ViewEncapsulation, Input, OnInit } from '@angular/core';
import { DropdownAppControl } from '../dropdown-app-control';
import { Calender } from './calender';

@Component({
  selector: 'app-datepicker',
  templateUrl: './app-datepicker.component.html',
  styleUrls: ['./app-datepicker.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppDatePickerComponent extends DropdownAppControl implements OnInit {

  @Input() placeholder: string;
  @Input() selectedDate = new Date();
  @Input() firstDay = 'fr';
  @Input() weekends = ['fr', 'st']

  titles = [];
  days = [];
  calenderTitle = '';

  // mode 1 = day
  // mode 2 = month
  // mode 3 = year
  mode = 1;

  // full monthe
  private fullMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'];

  private shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug',
    'Sep', 'Oct', 'Nov', 'Dec'];

  private calender: Calender;
  private currentMonth;
  private currentYear;

  private tempCurrentMonth;
  private tempCurrentYear;

  private months: string[][] = [];

  ngOnInit() {
    this.calender = new Calender();
    this.calender.setFirstDay('mo');
    this.calender.setCurrentDate(new Date());
    this.refresh();

    this.tempCurrentMonth = this.currentMonth;
    this.tempCurrentYear = this.currentYear;
  }

  openDropdown(e) {
    super.openDropdown(e);

    console.log('base panel');
  }

  selectDay(day) {
    console.log('day', day);
  }

  changeMode() {
    this.mode++;
    this.mode = this.mode > 4 ? 1 : this.mode;
  }

  next() {
    if (this.mode === 1) {
      this.calender.next();
      this.refresh();
    }
  }

  previous() {
    if (this.mode === 1) {
      this.calender.previous();
      this.refresh();
    }
  }

  private generateMonths() {
    
  }

  private refresh() {
    this.titles = this.calender.getTitles();
    this.days = this.calender.getDays();
    const _currentDate = this.calender.getCurrentDate();
    this.currentMonth = _currentDate.getMonth();
    this.currentYear = _currentDate.getFullYear();
    switch (this.mode) {
      case 1:
        this.calenderTitle = `${this.fullMonths[this.currentMonth]}, ${this.currentYear}`;
        break;
      default:
        this.calenderTitle = `${this.fullMonths[this.currentMonth]}, ${this.currentYear}`;
    }
  }


}