import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppInputModule } from './input/app-input.module';
import { AppSelectModule } from './select/app-select.module';
import { AppSelectMultipleModule } from './select-multiple/app-select-multiple.module';
import { AppDatePickerModule } from './datepicker/app-datepicker.module';


@NgModule({
    declarations: [
    ],
    imports: [
        BrowserModule,
        AppInputModule,
        AppSelectModule,
        AppSelectMultipleModule,
        AppDatePickerModule
    ],
    exports: [
        AppInputModule,
        AppSelectModule,
        AppSelectMultipleModule,
        AppDatePickerModule
    ]
})
export class AppControlModule { }
