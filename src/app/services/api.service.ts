import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, timeout } from 'rxjs/operators';
import { Item } from '../models/item.model';

/*
 * API Service - RESTful Communication Layer
 * Handles all HTTP operations with the backend server
 * Server: https://prog2005.it.scu.edu.au/ArtGalley
 * Student ID: 25108934
 * 
 * CRUD Operations:
 * - GET /: Retrieve all items
 * - GET /{name}: Retrieve single item
 * - POST /: Create new item
 * - PUT /{name}: Update existing item
 * - DELETE /{name}: Delete item
 */

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://prog2005.it.scu.edu.au/ArtGalley';
  private timeoutMs = 10000; // 10 second timeout for network requests
  private retryAttempts = 2; // Retry failed requests up to 2 times

  constructor(private http: HttpClient) { }

  /**
   * GET all items from the database
   * @returns Observable<Item[]> - Array of all inventory items
   */
  getAllItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrl + '/').pipe(
      timeout(this.timeoutMs),
      retry(this.retryAttempts),
      catchError(this.handleError)
    );
  }

  /**
   * GET single item by name
   * @param itemName - Name of the item to retrieve
   * @returns Observable<Item> - Single item object
   */
  getItemByName(itemName: string): Observable<Item> {
    const encodedName = encodeURIComponent(itemName);
    return this.http.get<Item>(`${this.apiUrl}/${encodedName}`).pipe(
      timeout(this.timeoutMs),
      retry(this.retryAttempts),
      catchError(this.handleError)
    );
  }

  /**
   * POST - Add new item to database
   * @param item - Item object to create (server auto-generates itemId)
   * @returns Observable<Item> - Created item with server-generated ID
   * Issue #12: Added retry for consistency with other methods
   */
  addItem(item: Item): Observable<Item> {
    // Remove itemId if present - server will auto-generate it
    const { itemId, ...itemData } = item;
    return this.http.post<Item>(this.apiUrl + '/', itemData).pipe(
      timeout(this.timeoutMs),
      retry(this.retryAttempts),
      catchError(this.handleError)
    );
  }

  /**
   * PUT - Update existing item by name
   * @param itemName - Current name of the item to update
   * @param item - Updated item object with new values
   * @returns Observable<Item> - Updated item object
   */
  updateItem(itemName: string, item: Item): Observable<Item> {
    const encodedName = encodeURIComponent(itemName);
    // Remove itemId from update payload - cannot modify primary key
    const { itemId, ...updateData } = item;
    return this.http.put<Item>(`${this.apiUrl}/${encodedName}`, updateData).pipe(
      timeout(this.timeoutMs),
      catchError(this.handleError)
    );
  }

  /**
   * DELETE - Remove item by name
   * Note: Deleting "Laptop" is forbidden and returns 403 Forbidden
   * @param itemName - Name of the item to delete
   * @returns Observable<any> - Success/error response message
   */
  deleteItem(itemName: string): Observable<any> {
    const encodedName = encodeURIComponent(itemName);
    return this.http.delete(`${this.apiUrl}/${encodedName}`).pipe(
      timeout(this.timeoutMs),
      catchError(this.handleError)
    );
  }

  /**
   * Centralized error handling for all HTTP requests
   * Provides user-friendly error messages and logs details for debugging
   * @param error - HttpErrorResponse from failed HTTP request
   * @returns Observable error with formatted message
   */
  private handleError(error: HttpErrorResponse) {
    let errorMessage: string;
    let statusCode: number = error.status || 0;

    if (error.error instanceof ErrorEvent) {
      // Client-side error or network failure
      errorMessage = `Network Error: ${error.error.message}`;
    } else {
      // Server returned an unsuccessful response code
      switch (statusCode) {
        case 0:
          errorMessage = 'Network Error: Unable to reach server. Check your internet connection.';
          break;
        case 400:
          errorMessage = `Bad Request: ${error.error?.message || 'Invalid data format. Please check your input.'}`;
          break;
        case 403:
          errorMessage = 'Access Denied: This item is protected and cannot be modified.';
          break;
        case 404:
          errorMessage = 'Not Found: The requested item does not exist in the database.';
          break;
        case 409:
          errorMessage = 'Conflict: Item name already exists. Please use a unique name.';
          break;
        case 500:
          errorMessage = 'Server Error: The server encountered an error. Please try again later.';
          break;
        case 503:
          errorMessage = 'Service Unavailable: The server is temporarily unavailable.';
          break;
        default:
          errorMessage = `Error ${statusCode}: ${error.error?.message || 'An unexpected error occurred.'}`;
      }
    }

    // Log detailed error information for debugging
    console.error('API Error Details:', {
      status: statusCode,
      message: errorMessage,
      url: error.url,
      timestamp: new Date().toISOString(),
      fullError: error.error
    });

    return throwError(() => ({
      message: errorMessage,
      status: statusCode,
      details: error.error
    }));
  }
}


