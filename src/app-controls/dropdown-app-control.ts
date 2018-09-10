import { AppControl } from "./app-control";

export class DropdownAppControl extends AppControl {

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