import { Component, ViewEncapsulation, Input, OnInit, ElementRef } from '@angular/core';
import { DropdownAppControl } from '../dropdown-app-control';

export interface IClockValue {
  number: number,
  rotateDeg: number,
  selected: boolean
  bigDial: boolean
}

export const MERIDIAN = {
  AM: 'am',
  PM: 'pm'
}

export const MODE = {
  HOUR: 'h',
  MINUTE: 'm'
}

@Component({
  selector: 'app-timepicker',
  templateUrl: './app-timepicker.component.html',
  styleUrls: ['./app-timepicker.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppTimePickerComponent extends DropdownAppControl implements OnInit {

  @Input() placeholder: string;
  @Input() selectedDate = new Date();
  @Input() time: string;

  mode = MODE.HOUR;

  values: IClockValue[] = [];
  selectedHourString: string = '12';
  selectedMinuteString: string = '00';
  selectedHour: number = 12;
  selectedMinute: number = 0;
  selectedMeridian: string = MERIDIAN.AM;
  handRotateDeg: number;

  constructor(ref: ElementRef) {
    super(ref);
  }

  ngOnInit() {
    console.log(this.mode);
    this.changeMode(this.mode);
  }

  selectValue(v) {
    let number = '';
    if (v.number < 10) {
      number = '0' + v.number;
    } else {
      number = '' + v.number;
    }
    if (this.mode === MODE.HOUR) {
      this.selectedHourString = number;
      this.selectedHour = v.number;
      this.changeMode(MODE.MINUTE);
    } else {
      this.selectedMinuteString = number;
      this.selectedMinute = v.number;
      this.refresh();
    }
    console.log('h', v);
  }

  private refresh() {
    this.changeMode(this.mode);
  }

  private changeMode(mode) {
    this.mode = mode;
    if (this.mode === MODE.HOUR) {
      this.makeHourValues();
    } else if (this.mode === MODE.MINUTE) {
      this.makeMinuteValues();
    }
  }

  changeMeridian(meridian) {
    this.selectedMeridian = meridian;
  }

  private makeHourValues() {
    const _values: IClockValue[] = [];
    let rotateDeg = 30;
    for (let i = 1; i <= 12; i++) {
      if (i === this.selectedHour) {
        this.handRotateDeg = rotateDeg;
      }
      _values.push({
        number: i,
        rotateDeg: rotateDeg,
        selected: i === this.selectedHour,
        bigDial: true
      });
      rotateDeg += 30;
    }
    this.values = _values;
  }

  private makeMinuteValues() {
    const _values: IClockValue[] = [];
    let rotateDeg = 6;
    for (let i = 1; i <= 60; i++) {
      if (i === this.selectedMinute) {
        this.handRotateDeg = rotateDeg;
      }
      _values.push({
        number: i,
        rotateDeg: rotateDeg,
        selected: false, //i === this.selectedMinute,
        bigDial: i % 5 === 0
      });
      rotateDeg += 6;
    }
    this.values = _values;
  }

}