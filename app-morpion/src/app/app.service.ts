import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class AppService {
  constructor(private http: HttpClient) { }

  appUrl = 'http://localhost:8000/api/';

  placeToken(line: number, column: number): Observable<any>{
    let coordinates = {
      line: line,
      col: column
    } 
    let queryParams = new HttpParams();
    queryParams = queryParams.append("coordinates", JSON.stringify(coordinates));
    return this.http.get<any>(this.appUrl + 'users/', {params: queryParams});
  }

}