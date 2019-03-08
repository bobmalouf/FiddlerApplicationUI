import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) { }

  public get<T>(url: string): Observable<T> {
    return this.httpClient.get<T>(environment.apiConfig.restURI +  url);
  }
  public getRawText(url: string): Observable<any> {
    return this.httpClient.get(environment.apiConfig.restURI +  url,  {responseType: 'text'});
  }
  public post<T>(url: string, body: any): Observable<T> {
    return this.httpClient.post<T>(environment.apiConfig.restURI +  url, body);
  }
  public put<T>(url: string, body: any): Observable<T> {
    return this.httpClient.post<T>(environment.apiConfig.restURI +  url, body);
  }
}
