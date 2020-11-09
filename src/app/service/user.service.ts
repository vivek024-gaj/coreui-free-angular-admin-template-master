import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

apiurl = environment.baseUrl;

constructor(private httpClient: HttpClient) { }

httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};


addUser(user): Observable<any> {
  return this.httpClient.post(this.apiurl + 'add-user', JSON.stringify(user), this.httpOptions).pipe(retry(1), catchError(this.errorHandl));
}

getUser(id: number): Observable<any> {
return this.httpClient.get(this.apiurl + 'user/' + id);
}

deleteUser(id: number): Observable<any> {
  return this.httpClient.delete(this.apiurl + 'user-delete/' + id);
}

updateUser(id: number, data): Observable<any> {
  return this.httpClient.put(this.apiurl + 'update-user/' + id, JSON.stringify(data),this.httpOptions).pipe(retry(1), catchError(this.errorHandl));
}

userList(): Observable<any> {
  return this.httpClient.get(this.apiurl + 'user-list');
}

errorHandl(error) {
  console.log(error);
  let errorMessage = '';
  if (error.error instanceof ErrorEvent) {
    // Get client-side error
    errorMessage = error.error.message;
  }
  else {
    // Get server-side error
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  console.log(errorMessage);
  return throwError(errorMessage);
}

}
