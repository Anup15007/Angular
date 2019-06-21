import { Injectable } from '@angular/core';
import {Category} from './category';
import {Observable, of} from 'rxjs';
import {MessageService} from './message.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  public httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private getAllCategoriesUrl = 'http://localhost:8200/getAllCategoryDetails';  // URL to get all categories list
  private getCategoryDetails = 'http://localhost:8200/getCategoryDetails'; // URL to get category for an id
  private updateCategoryDetails = 'http://localhost:8200/addCategory';
  private saveCategoryDetails = 'http://localhost:8200/addCategory';
  private deleteCategoryDetails = 'http://localhost:8200/deleteCategory';

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }


  /** GET heroes from the server */
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.getAllCategoriesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Category[]>('getCategories', []))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getCategory(id: number): Observable<Category> {
    const url = `${this.getCategoryDetails}/${id}`;
    return this.http.get<Category>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Category>(`getCategory id=${id}`))
    );
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`CategoryService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** PUT: update the hero on the server */
  updateCategory(category: Category): Observable<any> {
    return this.http.post(this.updateCategoryDetails, category, this.httpOptions).pipe(
      tap(_ => this.log(`updated category id=${category.categoryId}`)),
      catchError(this.handleError<any>('updateCategory'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteCategory(category: Category | number): Observable<Category> {
    const id = typeof category === 'number' ? category : category.categoryId;
    const url = `${this.deleteCategoryDetails}/${id}`;

    return this.http.delete<Category>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted category id=${id}`)),
      catchError(this.handleError<Category>('deleteCategory'))
    );
  }

  public addCategory(category: Category) {
    console.log(category);
    return this.http.post<Category>(this.saveCategoryDetails, category);
  }
}
