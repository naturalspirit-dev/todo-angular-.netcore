import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GetApiService {

  constructor(private http: HttpClient) { }
  
  //specific api call (this one is not using async/await)
  apiCall() {
    return this.http.get('https://jsonplaceholder.typicode.com/posts');
  }
}
