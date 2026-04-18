import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// API Service - handles HTTP requests (GET, POST, PUT, DELETE)
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
}
