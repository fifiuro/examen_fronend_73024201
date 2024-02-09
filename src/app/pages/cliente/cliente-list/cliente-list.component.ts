import { Component } from '@angular/core';
import { AlertsService } from 'src/app/helpers/alerts/alerts.service';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css'],
})
export class ClienteListComponent {
  buscar = { cliente: '' };
  cargando = false;
  cliente!: any[];
  pagination: number = 1;
  cantReg: number = 10;
  allCliente: number = 0;
  public hasError: boolean = false;

  titulo = '';
  isEdit: boolean = false;
  item: any;

  constructor(
    public clienteService: ClienteService,
    public alert: AlertsService
  ) {}

  ngOnInit() {
    this.listCliente();
  }

  ngDoCheck() {
    if (this.clienteService.refresh) {
      this.numRegistro();
      this.clienteService.refresh = false;
    }
  }

  listCliente() {
    this.clienteService.getCliente(this.pagination, this.cantReg).subscribe({
      next: (res: any) => {
        this.cliente = res.data;
        this.allCliente = res.total;
        this.cargando = true;
      },
    });
  }

  findCliente() {
    this.cargando = false;
    if (this.buscar.cliente) {
      this.clienteService
        .getLikeCliente(this.pagination, this.cantReg, this.buscar.cliente)
        .subscribe({
          next: (res: any) => {
            this.cliente = res.data;
            this.allCliente = res.total;
            this.pagination = res.current_page;
            this.cargando = true;
          },
        });
    } else {
      this.listCliente();
    }
  }

  findClienteByID(item: any) {
    this.isEdit = true;
    this.item = item;
    $('#modal-add-edit').modal('show');
  }

  async eliminaCliente(item: any) {
    await Swal.fire({
      title: '¿Esta seguro?',
      text: 'De eliminar Al Cliente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.deleteCliente(item.id).subscribe({
          next: (res: any) => {
            console.log(res);
            if(res.eliminado){
              Swal.fire('Eliminado!', 'El Cliente ha sido eliminado.', 'success');
              this.listCliente();
            }else{
              Swal.fire('Eliminado!', 'No se pudo Eliminar el registro del Cliente.', 'error');
            }
          },
        });
      }
    });
  }

  numRegistro() {
    this.cargando = false;
    this.pagination = 1;
    this.listCliente();
  }

  renderPage(event: number) {
    this.cargando = false;
    this.pagination = event;
    this.listCliente();
  }

  formAddCliente(titulo: boolean) {
    this.isEdit = false;
    $('#modal-add-edit').modal('show');
  }

  limpiar(e: boolean) {
    this.item = '';
  }
}
