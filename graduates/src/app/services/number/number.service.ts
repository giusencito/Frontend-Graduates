import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators"
import { Graduate } from 'src/app/models/Graduate';
@Injectable({
  providedIn: 'root'
})
export class NumberService {


  basePath="http://localhost:8080/api/v1/graduates/numbers"
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }
constructor(private http: HttpClient) { }
handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    console.log(`An error occurred: ${error.error.message} `);
  }
  else {
    console.error(
      `Backend returned code ${error.status}, body was: ${error.error}`
    );
  }

  return throwError('Something happened with request, please try again later');
}


getNumber(number:number){
  return this.http.get<Graduate>( `${this.basePath}/${number}`, this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));
}
getLess(number:number){
  return this.http.get<Graduate>( `${this.basePath}/noGraduatesLess/${number}`, this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));

}
getGreather(number:number){
  return this.http.get<Graduate>( `${this.basePath}/noGraduatesGreather/${number}`, this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));
}

}
