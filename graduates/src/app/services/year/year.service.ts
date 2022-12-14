import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";
import { Graduate } from 'src/app/models/Graduate';
@Injectable({
  providedIn: 'root'
})
export class YearService {

  basePath="http://localhost:8080/api/v1/graduates/years"
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

GetYear(year:string){

  return this.http.get<Graduate>( `${this.basePath}/${year}`, this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));

}
GetBetweenYear(year1:string,year2:string){
  return this.http.get<Graduate>( `${this.basePath}/betweenYear/${year1}/${year2}`, this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));


}
GetBeforeYear(year:string){
  return this.http.get<Graduate>( `${this.basePath}/beforeYear/${year}`, this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));


}
GetAfterYear(year:string){

  return this.http.get<Graduate>( `${this.basePath}/afterYear/${year}`, this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));

}




}
