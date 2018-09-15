import { Component, ViewEncapsulation, Input, OnInit, ElementRef } from '@angular/core';
import { DropdownAppControl } from '../dropdown-app-control';
import { Calendar, WEEKDAYS, MODE } from './calendar';

@Component({
  selector: 'app-datepicker',
  templateUrl: './app-datepicker.component.html',
  styleUrls: ['./app-datepicker.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppDatePickerComponent extends DropdownAppControl implements OnInit {

  @Input() placeholder: string;
  @Input() selectedDate = new Date();
  @Input() firstDay = WEEKDAYS.FRIDAY;
  @Input() weekends = [WEEKDAYS.FRIDAY, WEEKDAYS.SATURDAY];

  titles = [];
  days = [];
  months = [];
  years = [];
  calendarTitle;
  mode;

  private calendar: Calendar;

  constructor(ref: ElementRef) {
    super(ref);
  }

  ngOnInit() {
    this.calendar = new Calendar();
    this.calendar.setFirstDay(WEEKDAYS.MONDAY);
    this.calendar.refresh(new Date());
    this.refresh();
    console.log(this.mode);
  }

  openDropdown(e) {
    super.openDropdown(e);

    console.log('base panel');
  }

  selectDay(day) {
    console.log('day', day);
    this.calendar.refreshWithDay(day);
    console.log('selected date', this.calendar.getCurrentDate());
  }

  selectMonth(month) {
    this.calendar.changeMode(MODE.DAY);
    this.calendar.refreshWithMonth(month);
    this.refresh();
  }

  selectYear(year) {
    this.calendar.changeMode(MODE.MONTH);
    this.calendar.refreshWithYear(year);
    this.refresh();
  }

  changeMode() {
    this.calendar.toggleMode();
    this.refresh();
  }

  next() {
    this.calendar.next();
    this.refresh();
  }

  previous() {
    this.calendar.previous();
    this.refresh();
  }

  private refresh() {
    this.titles = this.calendar.getTitles();
    this.days = this.calendar.getDays();
    this.years = this.calendar.getYears();
    this.months = this.calendar.getMonths();
    this.calendarTitle = this.calendar.getCalendarTitle();
    this.mode = this.calendar.getMode();
  }


}