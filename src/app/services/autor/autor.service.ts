import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AutorInterface } from 'src/app/interfaces/autor/autor.interface';
import { Env } from 'src/environments/env';

@Injectable({
  providedIn: 'root',
})
export class AutorService {
  private readonly baseUrl: string = Env.baseUrl;
  public refresh!: boolean;
  public data!: AutorInterface;

  constructor(private http: HttpClient) {}

  getAutor(page: number, cant: number): Observable<AutorInterface[]> {
    return this.http.get<AutorInterface[]>(
      this.baseUrl + 'listAutor?page=' + page + '&cant=' + cant
    );
  }

  getLikeAutor(
    page: number,
    cant: number,
    texto: string
  ): Observable<AutorInterface[]> {
    return this.http.get<AutorInterface[]>(
      this.baseUrl +
        'findByLikeAutor?page=' +
        page +
        '&cant=' +
        cant +
        '&texto=' +
        texto
    );
  }

  getComboAutor(): Observable<AutorInterface[]> {
    return this.http.get<AutorInterface[]>(this.baseUrl + 'allAutor');
  }

  getByIDAutor(id: number): Observable<AutorInterface> {
    return this.http.get<AutorInterface>(this.baseUrl + 'editAutor/' + id);
  }

  postAddAutor(data: any): Observable<any> {
    return this.http.post(this.baseUrl + 'registerAutor', data);
  }

  putUpdateAutor(id: number, data: any): Observable<any> {
    return this.http.put(this.baseUrl + 'updateAutor/' + id, data);
  }

  deleteAutor(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + 'destroyAutor/' + id);
  }
}
