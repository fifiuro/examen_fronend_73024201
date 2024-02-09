import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PrestamoInterface } from 'src/app/interfaces/prestamo/cliente.interface';
import { Env } from 'src/environments/env';

@Injectable({
  providedIn: 'root',
})
export class PrestamoService {
  private readonly baseUrl: string = Env.baseUrl;
  public refresh!: boolean;
  public data!: PrestamoInterface;

  constructor(private http: HttpClient) {}

  getPrestamo(page: number, cant: number): Observable<PrestamoInterface[]> {
    return this.http.get<PrestamoInterface[]>(
      this.baseUrl + 'listPrestamos?page=' + page + '&cant=' + cant
    );
  }

  getLikePrestamo(
    page: number,
    cant: number,
    texto: string
  ): Observable<PrestamoInterface[]> {
    return this.http.get<PrestamoInterface[]>(
      this.baseUrl +
        'likeprestamosVencidos?page=' +
        page +
        '&cant=' +
        cant +
        '&texto=' +
        texto
    );
  }

  getPrestamoVencido(
    page: number,
    cant: number,
    texto: string
  ): Observable<PrestamoInterface[]> {
    return this.http.get<PrestamoInterface[]>(
      this.baseUrl + 'prestamosVencidos'
    );
  }

  getSegmetadoXmes(): Observable<PrestamoInterface[]> {
    return this.http.get<PrestamoInterface[]>(this.baseUrl + 'prestamosXmes');
  }

  getSegmetadoXmesXsemana(): Observable<PrestamoInterface[]> {
    return this.http.get<PrestamoInterface[]>(this.baseUrl + 'prestamosXmesXsemana');
  }

  getByIDPrestamo(id: number): Observable<PrestamoInterface> {
    return this.http.get<PrestamoInterface>(
      this.baseUrl + 'editPrestamos/' + id
    );
  }

  postAddPrestamo(data: any): Observable<any> {
    return this.http.post(this.baseUrl + 'registerPrestamos', data);
  }

  putUpdatePresatmo(id: number, data: any): Observable<any> {
    return this.http.put(this.baseUrl + 'updatePrestamos/' + id, data);
  }

  deleteCliente(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + 'destroyPrestamos/' + id);
  }
}
