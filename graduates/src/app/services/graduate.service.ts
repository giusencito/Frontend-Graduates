import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";
import { Graduate } from '../models/Graduate';
@Injectable({
  providedIn: 'root'
})
export class GraduateService {

  basePath="http://localhost:8080/api/v1/graduates"
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

getall(){
  return this.http.get<Graduate>(this.basePath, this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));



}









}
