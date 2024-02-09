import { Component } from '@angular/core';
import { AlertsService } from 'src/app/helpers/alerts/alerts.service';
import { PrestamoService } from 'src/app/services/prestamo/prestamo.service';

@Component({
  selector: 'app-resportes-vencidos',
  templateUrl: './resportes-vencidos.component.html',
  styleUrls: ['./resportes-vencidos.component.css'],
})
export class ResportesVencidosComponent {
  buscar = { cliente: '' };
  cargando = false;
  vencidos!: any[];
  pagination: number = 1;
  cantReg: number = 10;
  allVencidos: number = 0;

  constructor(
    public prestamosService: PrestamoService,
    public alert: AlertsService
  ) {}

  ngOnInit() {
    this.listPrestamos();
  }

  listPrestamos() {
    this.prestamosService
      .getPrestamoVencido(this.pagination, this.cantReg, this.buscar.cliente)
      .subscribe({
        next: (res: any) => {
          this.vencidos = res.data;
          this.allVencidos = res.total;
          this.cargando = true;
        },
      });
  }

  findPrestamoVencido() {
    this.cargando = false;
    if (this.buscar.cliente) {
      this.prestamosService
        .getLikePrestamo(this.pagination, this.cantReg, this.buscar.cliente)
        .subscribe({
          next: (res: any) => {
            this.vencidos = res.data;
            this.allVencidos = res.total;
            this.pagination = res.current_page;
            this.cargando = true;
          },
        });
    } else {
      this.listPrestamos();
    }
  }

  numRegistro() {
    this.cargando = false;
    this.pagination = 1;
    this.listPrestamos();
  }

  renderPage(event: number) {
    this.cargando = false;
    this.pagination = event;
    this.listPrestamos();
  }
}
