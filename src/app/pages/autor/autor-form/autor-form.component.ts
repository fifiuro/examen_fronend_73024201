import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertsService } from 'src/app/helpers/alerts/alerts.service';
import { AutorService } from 'src/app/services/autor/autor.service';
declare var $: any;

@Component({
  selector: 'app-autor-form',
  templateUrl: './autor-form.component.html',
  styleUrls: ['./autor-form.component.css'],
})
export class AutorFormComponent {
  @Input() tituloForm!: string;
  @Input() isEdit!: boolean;
  @Input() item: any;
  @Output() clearItem = new EventEmitter<boolean>();
  isClicked: boolean = false;
  router: any;
  autores: any;

  constructor(
    public autorService: AutorService,
    private alert: AlertsService
  ) {}

  ngOnInit() {
    
  }

  ngOnChanges() {
    this.recoveryAutor();
  }

  get name() {
    return this.formAutor.get('name') as FormControl;
  }

  formAutor = new FormGroup({
    name: new FormControl('', Validators.required),
  });

  createAutor() {
    this.isClicked = true;
    if (this.formAutor.valid) {
      if (this.isEdit) {
        this.autorService
          .putUpdateAutor(this.item.id, this.formAutor.value)
          .subscribe({
            next: (val: any) => {
              if (val.data) {
                this.alert.sweet(
                  'Edición Autor',
                  'Se realizó correctamente.',
                  'success'
                );
                this.limpiar();
                this.autorService.refresh = true;
                this.isClicked = false;
                $('#modal-add-edit').modal('hide');
              } else {
                this.alert.sweet(
                  'Edición Autor',
                  'No se pudo realizar la edición.',
                  'error'
                );
                this.limpiar();
                this.autorService.refresh = true;
                this.isClicked = false;
                $('#modal-add-edit').modal('hide');
              }
            },
          });
      } else {
        this.autorService.postAddAutor(this.formAutor.value).subscribe({
          next: (val: any) => {
            if (val.estado) {
              this.alert.sweet(
                'Registro Autor',
                'Se realizó correctamente.',
                'success'
              );
              this.limpiar();
              this.autorService.refresh = true;
            } else {
              this.alert.sweet(
                'Registro de Autor',
                'No se pudo realizar el registro. ',
                'error'
              );
              this.limpiar();
              this.autorService.refresh = true;
            }
          },
        });
        this.isClicked = false;
        $('#modal-add-edit').modal('hide');
      }
    }
  }

  recoveryAutor() {
    if (this.item) {
      this.autorService.getByIDAutor(this.item.id).subscribe({
        next: (val: any) => {
          this.formAutor.patchValue(val.data);
        },
      });
    }
  }

  limpiar() {
    this.formAutor.reset();
    this.item = '';
    this.isClicked = false;
    this.clearItem.emit(true);
  }

}
