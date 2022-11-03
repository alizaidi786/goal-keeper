import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonHttpService {

  private url = 'https://motivational-quote-api.herokuapp.com/quotes/random'
  constructor(private http:HttpClient) { }

  getQuote():Observable<any>{
     return this.http.get(this.url) ;
  }

}
