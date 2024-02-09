import { Component } from '@angular/core';
import { AlertsService } from 'src/app/helpers/alerts/alerts.service';
import { LibroService } from 'src/app/services/libro/libro.service';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-libro-list',
  templateUrl: './libro-list.component.html',
  styleUrls: ['./libro-list.component.css'],
})
export class LibroListComponent {
  buscar = { libro: '' };
  cargando = false;
  libro!: any[];
  pagination: number = 1;
  cantReg: number = 10;
  allLibro: number = 0;
  public hasError: boolean = false;

  tituloForm = '';
  isEdit: boolean = false;
  item: any;

  constructor(public libroService: LibroService, public alert: AlertsService) {}

  ngOnInit() {
    this.listLibro();
  }

  ngDoCheck() {
    if (this.libroService.refresh) {
      this.numRegistro();
      this.libroService.refresh = false;
    }
  }

  listLibro() {
    this.libroService.getLibro(this.pagination, this.cantReg).subscribe({
      next: (res: any) => {
        this.libro = res.data;
        this.allLibro = res.total;
        this.cargando = true;
      },
    });
  }

  findLibro() {
    this.cargando = false;
    if (this.buscar.libro) {
      this.libroService
        .getLikeLibro(this.pagination, this.cantReg, this.buscar.libro)
        .subscribe({
          next: (res: any) => {
            this.libro = res.data;
            this.allLibro = res.total;
            this.pagination = res.current_page;
            this.cargando = true;
          },
        });
    } else {
      this.listLibro();
    }
  }

  findLibroByID(item: any) {
    this.isEdit = true;
    this.item = item;
    $('#modal-add-edit').modal('show');
  }

  async eliminaLibro(item: any) {
    await Swal.fire({
      title: '¿Esta seguro?',
      text: 'De eliminar el Libro',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.libroService.deleteLibro(item.id).subscribe({
          next: (res: any) => {
            console.log(res);
            if (res.eliminado) {
              Swal.fire('Eliminado!', 'El Libro ha sido eliminado.', 'success');
              this.pagination = 1;
              this.listLibro();
            } else {
              Swal.fire(
                'Eliminado!',
                'No se pudo Eliminar el registro del Libro.',
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
    this.listLibro();
  }

  renderPage(event: number) {
    this.cargando = false;
    this.pagination = event;
    this.listLibro();
  }

  formAddLibro(titulo: boolean) {
    this.isEdit = false;
    $('#modal-add-edit').modal('show');
  }

  limpiar(e: boolean) {
    this.item = '';
  }
}
