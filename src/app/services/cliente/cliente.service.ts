import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CLienteInterface } from 'src/app/interfaces/cliente/cliente.interface';
import { Env } from 'src/environments/env';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private readonly baseUrl: string = Env.baseUrl;
  public refresh!: boolean;
  public data!: CLienteInterface;

  constructor(private http: HttpClient) {}

  getCliente(page: number, cant: number): Observable<CLienteInterface[]> {
    return this.http.get<CLienteInterface[]>(
      this.baseUrl + 'listCliente?page=' + page + '&cant=' + cant
    );
  }

  getLikeCliente(
    page: number,
    cant: number,
    texto: string
  ): Observable<CLienteInterface[]> {
    return this.http.get<CLienteInterface[]>(
      this.baseUrl +
        'findByLike?page=' +
        page +
        '&cant=' +
        cant +
        '&texto=' +
        texto
    );
  }

  getComboCliente(): Observable<CLienteInterface[]> {
    return this.http.get<CLienteInterface[]>(this.baseUrl + 'allCliente');
  }

  getByIDCliente(id: number): Observable<CLienteInterface> {
    return this.http.get<CLienteInterface>(this.baseUrl + 'editCliente/' + id);
  }

  postAddCliente(data: any): Observable<any> {
    return this.http.post(this.baseUrl + 'registerCliente', data);
  }

  putUpdateCliente(id: number, data: any): Observable<any> {
    return this.http.put(this.baseUrl + 'updateCliente/' + id, data);
  }

  deleteCliente(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + 'destroyCliente/' + id);
  }
}
