import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LibroInterface } from 'src/app/interfaces/libro/libro.interface';
import { Env } from 'src/environments/env';

@Injectable({
  providedIn: 'root',
})
export class LibroService {
  private readonly baseUrl: string = Env.baseUrl;
  public refresh!: boolean;
  public data!: LibroInterface;

  constructor(private http: HttpClient) {}

  getLibro(page: number, cant: number): Observable<LibroInterface[]> {
    return this.http.get<LibroInterface[]>(
      this.baseUrl + 'listLibro?page=' + page + '&cant=' + cant
    );
  }

  getLikeLibro(
    page: number,
    cant: number,
    texto: string
  ): Observable<LibroInterface[]> {
    return this.http.get<LibroInterface[]>(
      this.baseUrl +
        'findByLikeLibro?page=' +
        page +
        '&cant=' +
        cant +
        '&texto=' +
        texto
    );
  }

  getComboLibro(): Observable<LibroInterface[]> {
    return this.http.get<LibroInterface[]>(this.baseUrl + 'allLibro');
  }

  getByIDLibro(id: number): Observable<LibroInterface> {
    return this.http.get<LibroInterface>(this.baseUrl + 'editLibro/' + id);
  }

  postAddLibro(data: any): Observable<any> {
    return this.http.post(this.baseUrl + 'registerLibro', data);
  }

  putUpdateLibro(id: number, data: any): Observable<any> {
    return this.http.put(this.baseUrl + 'updateLibro/' + id, data);
  }

  deleteLibro(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + 'destroyLibro/' + id);
  }
}
