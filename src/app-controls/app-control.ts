import { IAppControl } from "./interfaces/icontrol";
import { Input } from "@angular/core";

export class AppControl implements IAppControl {
    @Input() model: any;
    @Input() name: string;
    @Input() value: any;
    @Input() label: string;
    error: boolean;
    message: string;
}