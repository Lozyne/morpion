import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class GameService {
  constructor(private http: HttpClient) { }

  appUrl = 'http://localhost:8000/api/';

  initGame(): Observable<any>{
    return this.http.get<any>(this.appUrl + 'games/');
  }
  
}