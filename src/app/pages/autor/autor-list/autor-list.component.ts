import { Component } from '@angular/core';
import { AlertsService } from 'src/app/helpers/alerts/alerts.service';
import { AutorService } from 'src/app/services/autor/autor.service';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-autor-list',
  templateUrl: './autor-list.component.html',
  styleUrls: ['./autor-list.component.css'],
})
export class AutorListComponent {
  buscar = { autor: '' };
  cargando = false;
  autor!: any[];
  pagination: number = 1;
  cantReg: number = 10;
  allAutor: number = 0;
  public hasError: boolean = false;

  tituloForm = '';
  isEdit: boolean = false;
  item: any;

  constructor(public autorService: AutorService, public alert: AlertsService) {}

  ngOnInit() {
    this.listAutor();
  }

  ngDoCheck() {
    if (this.autorService.refresh) {
      this.numRegistro();
      this.autorService.refresh = false;
    }
  }

  listAutor() {
    this.autorService.getAutor(this.pagination, this.cantReg).subscribe({
      next: (res: any) => {
        this.autor = res.data;
        this.allAutor = res.total;
        this.cargando = true;
      },
    });
  }

  findAutor() {
    this.cargando = false;
    if (this.buscar.autor) {
      this.autorService
        .getLikeAutor(this.pagination, this.cantReg, this.buscar.autor)
        .subscribe({
          next: (res: any) => {
            this.autor = res.data;
            this.allAutor = res.total;
            this.pagination = res.current_page;
            this.cargando = true;
          },
        });
    } else {
      this.listAutor();
    }
  }

  findAutorByID(item: any) {
    this.isEdit = true;
    this.item = item;
    $('#modal-add-edit').modal('show');
  }

  async eliminaAutor(item: any) {
    await Swal.fire({
      title: '¿Esta seguro?',
      text: 'De eliminar el Autor',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.autorService.deleteAutor(item.id).subscribe({
          next: (res: any) => {
            console.log(res);
            if (res.eliminado) {
              Swal.fire('Eliminado!', 'El Autor ha sido eliminado.', 'success');
              this.pagination = 1;
              this.listAutor();
            } else {
              Swal.fire(
                'Eliminado!',
                'No se pudo Eliminar el registro del Autor.',
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
    this.listAutor();
  }

  renderPage(event: number) {
    this.cargando = false;
    this.pagination = event;
    this.listAutor();
  }

  formAddLibro(titulo: boolean) {
    this.isEdit = false;
    $('#modal-add-edit').modal('show');
  }

  limpiar(e: boolean) {
    this.item = '';
  }
}
