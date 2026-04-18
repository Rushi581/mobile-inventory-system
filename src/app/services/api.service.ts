import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Item } from '../models/item.model';

/*
 * API Service - Handles all HTTP requests
 * Server endpoint: https://prog2005.it.scu.edu.au/ArtGalley
 * Student ID: 25108934
 */

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://prog2005.it.scu.edu.au/ArtGalley';

  constructor(private http: HttpClient) { }

  /**
   * GET all items from the database
   */
  getAllItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrl + '/').pipe(
      catchError(this.handleError)
    );
  }

  /**
   * GET single item by name
   */
  getItemByName(itemName: string): Observable<Item> {
    return this.http.get<Item>(`${this.apiUrl}/${itemName}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * POST - Add new item to database
   */
  addItem(item: Item): Observable<Item> {
    return this.http.post<Item>(this.apiUrl + '/', item).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * PUT - Update existing item by name
   */
  updateItem(itemName: string, item: Item): Observable<Item> {
    return this.http.put<Item>(`${this.apiUrl}/${itemName}`, item).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * DELETE - Remove item by name
   * Note: Deleting "Laptop" will return an error
   */
  deleteItem(itemName: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${itemName}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Error handling
   */
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}

