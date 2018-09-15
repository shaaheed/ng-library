import { AppControl } from "./app-control";
import { IInputAppControl } from "./interfaces/iinput-control";
import { Input, ElementRef } from "@angular/core";

export class InputAppControl extends AppControl implements IInputAppControl {

    @Input() type: string;
    @Input() placeholder: string;

    constructor(ref: ElementRef) {
        super(ref);
    }

}