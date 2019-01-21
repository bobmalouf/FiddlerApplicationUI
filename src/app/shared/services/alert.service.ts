import { Injectable } from '@angular/core';
import { Alert } from '../model/alert';
import { AlertType } from '../enum/alert-type.enum';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  private alerts: Alert[] = [];

  public getAlerts(): Alert[] {
    return this.alerts;
  }
  public createAlert(type: AlertType, alertText: string, dismissable: boolean): void {
    this.alerts.unshift(new Alert(type, alertText, dismissable))
    setTimeout(() => {
      this.alerts.pop();
    }, 5000);
    
  }
}
