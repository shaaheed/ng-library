import { Input, ElementRef } from "@angular/core";
import { DropdownAppControl } from "./dropdown-app-control";

export class SelectAppControl extends DropdownAppControl {

    @Input() items: any[] = [];
    @Input() searchable: boolean;
    @Input() valueProp: string = 'id';
    @Input() displayProp: string = 'name';

    private originalItems: any[] = [];

    constructor(ref: ElementRef) {
        super(ref);
    }

    clearSearch() {
        this.items = this.originalItems;
    }

    init() {
        this.originalItems = JSON.parse(JSON.stringify(this.items));
    }

    search(e) {
        let searchTerm = e;
        if (searchTerm === '' || searchTerm === null || searchTerm === undefined) {
            this.items = this.originalItems;
        } else {
            searchTerm = searchTerm.toLowerCase();
            this.items = this.originalItems.filter(x => x[this.displayProp].toLowerCase().indexOf(searchTerm) > -1);
        }
    }

}