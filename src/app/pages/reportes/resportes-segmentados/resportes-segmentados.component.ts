import { Component } from '@angular/core';
import { AlertsService } from 'src/app/helpers/alerts/alerts.service';
import { PrestamoService } from 'src/app/services/prestamo/prestamo.service';

@Component({
  selector: 'app-resportes-segmentados',
  templateUrl: './resportes-segmentados.component.html',
  styleUrls: ['./resportes-segmentados.component.css'],
})
export class ResportesSegmentadosComponent {
  cargando = false;
  porMes!: any;
  mes = [
    '',
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Noviembre',
    'Diciembre',
  ];

  constructor(
    public prestamoService: PrestamoService,
    public alert: AlertsService
  ) {}

  ngOnInit() {
    // this.segmentadoXmes();
  }

  segmentadoXmes() {
    this.prestamoService.getSegmetadoXmes().subscribe({
      next: (res: any) => {
        this.porMes = res;
        this.cargando = true;
      },
    });
  }

  segmentadoXmesXsemana() {
    this.prestamoService.getSegmetadoXmesXsemana().subscribe({
      next: (res: any) => {
        this.porMes = res;
        this.cargando = true;
      },
    });
  }
}
