import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators"
import { Graduate } from 'src/app/models/Graduate';
@Injectable({
  providedIn: 'root'
})
export class CombineService {

  basePath="http://localhost:8080/api/v1/graduatesCrud"
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
getSexYear(sex:string,year:string){
  return this.http.get<Graduate>( `${this.basePath}/getSexAndYear/${sex}/${year}`, this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));
}
getSexCourse(sex:string,course:string){
  return this.http.get<Graduate>( `${this.basePath}/getSexAndCourse/${sex}/${course}`, this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));
  
}
getSexNumber(sex:string,number:number){
  return this.http.get<Graduate>( `${this.basePath}/getSexAndNumber/${sex}/${number}`, this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));
  
}
getYearCourse(year:string,course:string){
  return this.http.get<Graduate>( `${this.basePath}/getSeYearAndCourse/${year}/${course}`, this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));
  
}


















}
