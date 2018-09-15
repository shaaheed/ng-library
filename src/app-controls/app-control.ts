import { IAppControl } from "./interfaces/icontrol";
import { Input, ElementRef } from "@angular/core";

export class AppControl implements IAppControl {

    @Input() model: any;
    @Input() name: string;
    @Input() value: any;
    @Input() label: string;
    error: boolean;
    message: string;
    id: string;

    constructor(public ref: ElementRef) {
        this.id = this.uuid();
        this.ref.nativeElement.setAttribute('id', this.id);
    }

    uuid() { // Public Domain/MIT
        let d = new Date().getTime();
        if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
            d += performance.now(); //use high-precision timer if available
        }
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }
}