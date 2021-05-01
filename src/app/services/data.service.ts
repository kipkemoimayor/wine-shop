import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Wine } from '../interface/wine';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  apiUrl: string = environment.apiUrl;
  imageBaseUrl: string = environment.imageBaseUrl;
  constructor(private http: HttpClient) { }

  getWines(): Observable<Wine[]> {
    return <any>this.http.get(this.apiUrl).pipe(
      delay(2000),
      map(response => <JSON>response)
    )
  }
}
