import { AppControl } from "./app-control";
import { ElementRef } from "@angular/core";

export class DropdownAppControl extends AppControl {

    constructor(public ref: ElementRef) {
        super(ref);

        document.addEventListener('click', (event) => {
            const el = document.getElementById(this.id);
            if (el) {
                const isClickInside = el.contains(<Node>event.target);
                if (!isClickInside) {
                    // the click was outside
                    if (this.open) {
                        this.closeDropdown();
                    }
                }
            }
        });

    }

    open = false;

    openDropdown(e) {
        this.open = true;
    }

    closeDropdown() {
        this.open = false;
    }

    toggleDropdown(e) {
        this.open = !this.open;
    }

}