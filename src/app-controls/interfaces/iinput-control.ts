import { IAppControl } from "./icontrol";

export interface IInputAppControl extends IAppControl {
    type: string;
    placeholder: string;
}