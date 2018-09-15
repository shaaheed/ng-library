import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppInputModule } from './input/app-input.module';
import { AppSelectModule } from './select/app-select.module';
import { AppDatePickerModule } from './datepicker/app-datepicker.module';
import { AppMultiSelectModule } from './multi-select/app-multi-select.module';
import { AppProgressModule } from './progress/app-progress.module';
import { AppScrollbarModule } from './scrollbar/app-scrollbar.module';
import { AppTimePickerModule } from './timepicker/app-timepicker.module';
import { AppColorPickerModule } from './colorpicker/app-colorpicker.module';


@NgModule({
    declarations: [
    ],
    imports: [
        BrowserModule,
        AppInputModule,
        AppSelectModule,
        AppMultiSelectModule,
        AppDatePickerModule,
        AppProgressModule,
        AppScrollbarModule,
        AppTimePickerModule,
        AppColorPickerModule
    ],
    exports: [
        AppInputModule,
        AppSelectModule,
        AppMultiSelectModule,
        AppDatePickerModule,
        AppProgressModule,
        AppScrollbarModule,
        AppTimePickerModule,
        AppColorPickerModule
    ]
})
export class AppControlModule { }
