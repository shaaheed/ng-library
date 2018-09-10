import { AppControl } from "./app-control";
import { IInputAppControl } from "./interfaces/iinput-control";
import { Input, Component } from "@angular/core";

export class InputAppControl extends AppControl implements IInputAppControl {
    @Input() type: string;
    @Input() placeholder: string;
}