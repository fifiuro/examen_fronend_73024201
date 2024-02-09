import { Component } from '@angular/core';
import { AlertsService } from 'src/app/helpers/alerts/alerts.service';
import { PrestamoService } from 'src/app/services/prestamo/prestamo.service';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-prestamos-list',
  templateUrl: './prestamos-list.component.html',
  styleUrls: ['./prestamos-list.component.css'],
})
export class PrestamosListComponent {
  buscar = { cliente: '' };
  cargando = false;
  prestamo!: any[];
  pagination: number = 1;
  cantReg: number = 10;
  allPrestamo: number = 0;
  public hasError: boolean = false;

  titulo = '';
  isEdit: boolean = false;
  item: any;

  constructor(
    public prestamoService: PrestamoService,
    public alert: AlertsService
  ) {}

  ngOnInit() {
    this.listPrestamo();
  }

  ngDoCheck() {
    if (this.prestamoService.refresh) {
      this.numRegistro();
      this.prestamoService.refresh = false;
    }
  }

  listPrestamo() {
    this.prestamoService.getPrestamo(this.pagination, this.cantReg).subscribe({
      next: (res: any) => {
        console.log(res.data);
        this.prestamo = res.data;
        this.allPrestamo = res.total;
        this.cargando = true;
      },
    });
  }

  findPrestamo() {
    this.cargando = false;
    if (this.buscar.cliente) {
      this.prestamoService
        .getLikePrestamo(this.pagination, this.cantReg, this.buscar.cliente)
        .subscribe({
          next: (res: any) => {
            this.prestamo = res.data;
            this.allPrestamo = res.total;
            this.pagination = res.current_page;
            this.cargando = true;
          },
        });
    } else {
      this.listPrestamo();
    }
  }

  findPrestamoByID(item: any) {
    this.isEdit = true;
    this.item = item;
    $('#modal-add-edit').modal('show');
  }

  async eliminaPrestamo(item: any) {
    await Swal.fire({
      title: '¿Esta seguro?',
      text: 'De eliminar el Prestamo',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.prestamoService.deleteCliente(item.id).subscribe({
          next: (res: any) => {
            console.log(res);
            if (res.eliminado) {
              Swal.fire(
                'Eliminado!',
                'El Prestamo ha sido eliminado.',
                'success'
              );
              this.listPrestamo();
            } else {
              Swal.fire(
                'Eliminado!',
                'No se pudo Eliminar el registro del Prestamo.',
                'error'
              );
            }
          },
        });
      }
    });
  }

  numRegistro() {
    this.cargando = false;
    this.pagination = 1;
    this.listPrestamo();
  }

  renderPage(event: number) {
    this.cargando = false;
    this.pagination = event;
    this.listPrestamo();
  }

  formAddPrestamo(titulo: boolean) {
    this.isEdit = false;
    $('#modal-add-edit').modal('show');
  }

  limpiar(e: boolean) {
    this.item = '';
  }
}
