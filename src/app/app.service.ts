import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(private http: HttpClient) {
  }

  getMessage$(): Observable<string> {
    return this.http.get<{text: string}>('/api/GetMessage').pipe(
      map(res => res.text)
    );
  }
}
