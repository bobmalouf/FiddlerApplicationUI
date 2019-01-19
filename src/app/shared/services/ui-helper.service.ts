import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class UiHelperService {

  constructor() { }

  public getTimeFromDate(date: Date): String {
    return moment(date).fromNow();
  }
}
