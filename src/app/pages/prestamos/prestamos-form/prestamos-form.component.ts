import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertsService } from 'src/app/helpers/alerts/alerts.service';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { LibroService } from 'src/app/services/libro/libro.service';
import { PrestamoService } from 'src/app/services/prestamo/prestamo.service';
declare var $: any;

@Component({
  selector: 'app-prestamos-form',
  templateUrl: './prestamos-form.component.html',
  styleUrls: ['./prestamos-form.component.css'],
})
export class PrestamosFormComponent {
  @Input() titulo!: string;
  @Input() isEdit!: boolean;
  @Input() item: any;
  @Output() clearItem = new EventEmitter<boolean>();
  isClicked: boolean = false;
  router: any;
  libros: any;
  selectedLibro!: number;
  clientes: any;
  selectedCliente!: number;
  selectedEstado!: string;

  fechaF!: string;

  constructor(
    public prestamoService: PrestamoService,
    public libroService: LibroService,
    public clienteService: ClienteService,
    private alert: AlertsService
  ) {}

  ngOnInit() {
    this.comboLibro();
    this.comboCliente();
  }

  ngOnChanges() {
    this.recoveryPrestamo();
  }

  get libro_id() {
    return this.formPrestamo.get('libro_id') as FormControl;
  }

  get cliente_id() {
    return this.formPrestamo.get('cliente_id') as FormControl;
  }

  get fecha_prestamo() {
    return this.formPrestamo.get('fecha_prestamo') as FormControl;
  }

  get dias_prestamo() {
    return this.formPrestamo.get('dias_prestamo') as FormControl;
  }

  get estado() {
    return this.formPrestamo.get('estado') as FormControl;
  }

  formPrestamo = new FormGroup({
    libro_id: new FormControl('', Validators.required),
    cliente_id: new FormControl('', Validators.required),
    fecha_prestamo: new FormControl('', Validators.required),
    dias_prestamo: new FormControl('', Validators.required),
    estado: new FormControl('', Validators.required),
  });

  createCliente() {
    this.isClicked = true;
    if (this.formPrestamo.valid) {
      if (this.isEdit) {
        this.prestamoService
          .putUpdatePresatmo(this.item.id, this.formPrestamo.value)
          .subscribe({
            next: (val: any) => {
              if (val.data) {
                this.alert.sweet(
                  'Edición Prestamo',
                  'Se realizó correctamente.',
                  'success'
                );
                this.limpiar();
                this.prestamoService.refresh = true;
                this.isClicked = false;
                $('#modal-add-edit').modal('hide');
              } else {
                this.alert.sweet(
                  'Edición Presamo',
                  'No se pudo realizar la edición.',
                  'error'
                );
                this.limpiar();
                this.prestamoService.refresh = true;
                this.isClicked = false;
                $('#modal-add-edit').modal('hide');
              }
            },
          });
      } else {
        this.prestamoService
          .postAddPrestamo(this.formPrestamo.value)
          .subscribe({
            next: (val: any) => {
              if (val.estado) {
                this.alert.sweet(
                  'Registro de Prestamo',
                  'Se realizó correctamente.',
                  'success'
                );
                this.limpiar();
                this.prestamoService.refresh = true;
              } else {
                this.alert.sweet(
                  'Registro de Prestamo',
                  'No se pudo realizar el registro.',
                  'error'
                );
                this.limpiar();
                this.prestamoService.refresh = true;
              }
            },
          });
        this.isClicked = false;
        $('#modal-add-edit').modal('hide');
      }
    }
  }

  recoveryPrestamo() {
    if (this.item) {
      this.prestamoService.getByIDPrestamo(this.item.id).subscribe({
        next: (val: any) => {
          console.log(val.data);
          this.formPrestamo.patchValue(val.data);
          this.formPrestamo
            .get('fecha_prestamo')
            ?.setValue(this.formatDate(new Date(val.data.fecha_prestamo)));
        },
      });
    }
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  limpiar() {
    this.formPrestamo.reset();
    this.item = '';
    this.isClicked = false;
    this.clearItem.emit(true);
  }

  comboLibro() {
    this.libroService.getComboLibro().subscribe({
      next: (val: any) => {
        this.libros = val;
      },
    });
  }

  comboCliente() {
    this.clienteService.getComboCliente().subscribe({
      next: (val: any) => {
        this.clientes = val;
      },
    });
  }
}
