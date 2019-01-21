import { AlertType } from '../enum/alert-type.enum';

export class Alert {

    type: AlertType
    text: String;
    dismissable: boolean;

    constructor(type: AlertType,
        text: String,
        dismissable: boolean){
            this.type = type;
            this.text = text;
            this.dismissable = dismissable;
        }
    
}
