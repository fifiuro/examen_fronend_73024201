import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertsService } from 'src/app/helpers/alerts/alerts.service';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
declare var $: any;

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css'],
})
export class ClienteFormComponent {
  @Input() titulo!: string;
  @Input() isEdit!: boolean;
  @Input() item: any;
  @Output() clearItem = new EventEmitter<boolean>();
  isClicked: boolean = false;
  router: any;

  constructor(
    public clienteService: ClienteService,
    private alert: AlertsService
  ) {}

  ngOnChanges() {
    this.recoveryCliente();
  }

  get name() {
    return this.formCliente.get('name') as FormControl;
  }

  get email() {
    return this.formCliente.get('email') as FormControl;
  }

  get celular() {
    return this.formCliente.get('celular') as FormControl;
  }

  formCliente = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    celular: new FormControl('', Validators.required),
  });

  createCliente() {
    this.isClicked = true;
    if (this.formCliente.valid) {
      if (this.isEdit) {
        this.clienteService
          .putUpdateCliente(this.item.id, this.formCliente.value)
          .subscribe({
            next: (val: any) => {
              if (val.data) {
                this.alert.sweet(
                  'Edición Cliente',
                  'Se realizó correctamente.',
                  'success'
                );
                this.limpiar();
                this.clienteService.refresh = true;
                this.isClicked = false;
                $('#modal-add-edit').modal('hide');
              } else {
                this.alert.sweet(
                  'Edición Cliente',
                  'No se pudo realizar la edición.',
                  'error'
                );
                this.limpiar();
                this.clienteService.refresh = true;
                this.isClicked = false;
                $('#modal-add-edit').modal('hide');
              }
            },
          });
      } else {
        this.clienteService.postAddCliente(this.formCliente.value).subscribe({
          next: (val: any) => {
            if (val) {
              this.alert.sweet(
                'Registro de Unidad',
                'Se realizó correctamente.',
                'success'
              );
              this.limpiar();
              this.clienteService.refresh = true;
            } else {
              this.alert.sweet(
                'Registro de Unidad',
                'No se pudo realizar el registro.',
                'error'
              );
              this.limpiar();
              this.clienteService.refresh = true;
            }
          },
        });
        this.isClicked = false;
        $('#modal-add-edit').modal('hide');
      }
    }
  }

  recoveryCliente() {
    if (this.item) {
      this.clienteService.getByIDCliente(this.item.id).subscribe({
        next: (val: any) => {
          this.formCliente.patchValue(val.data);
        },
      });
    }
  }

  limpiar() {
    this.formCliente.reset();
    this.item = '';
    this.isClicked = false;
    this.clearItem.emit(true);
  }
}
