import { Input } from "@angular/core";
import { DropdownAppControl } from "./dropdown-app-control";

export class SelectAppControl extends DropdownAppControl {

    @Input() searchable: boolean;
    @Input() valueProp: string = 'id';
    @Input() displayProp: string = 'name';

}