import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertsService } from 'src/app/helpers/alerts/alerts.service';
import { LibroService } from 'src/app/services/libro/libro.service';
import { AutorService } from 'src/app/services/autor/autor.service';
declare var $: any;

@Component({
  selector: 'app-libro-form',
  templateUrl: './libro-form.component.html',
  styleUrls: ['./libro-form.component.css'],
})
export class LibroFormComponent {
  @Input() tituloForm!: string;
  @Input() isEdit!: boolean;
  @Input() item: any;
  @Output() clearItem = new EventEmitter<boolean>();
  isClicked: boolean = false;
  router: any;
  autores: any;
  selectedLibro!: number;

  constructor(
    public libroService: LibroService,
    public AutorService: AutorService,
    private alert: AlertsService
  ) {}

  ngOnInit() {
    this.comboAutor();
  }

  ngOnChanges() {
    this.recoveryLibro();
  }

  get titulo() {
    return this.formLibro.get('titulo') as FormControl;
  }

  get autor_id() {
    return this.formLibro.get('autor_id') as FormControl;
  }

  get lote() {
    return this.formLibro.get('lote') as FormControl;
  }

  get description() {
    return this.formLibro.get('description') as FormControl;
  }

  formLibro = new FormGroup({
    titulo: new FormControl('', Validators.required),
    autor_id: new FormControl('', Validators.required),
    lote: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });

  createLibro() {
    this.isClicked = true;
    if (this.formLibro.valid) {
      if (this.isEdit) {
        this.libroService
          .putUpdateLibro(this.item.id, this.formLibro.value)
          .subscribe({
            next: (val: any) => {
              if (val.data) {
                this.alert.sweet(
                  'Edición Libro',
                  'Se realizó correctamente.',
                  'success'
                );
                this.limpiar();
                this.libroService.refresh = true;
                this.isClicked = false;
                $('#modal-add-edit').modal('hide');
              } else {
                this.alert.sweet(
                  'Edición Cliente',
                  'No se pudo realizar la edición.',
                  'error'
                );
                this.limpiar();
                this.libroService.refresh = true;
                this.isClicked = false;
                $('#modal-add-edit').modal('hide');
              }
            },
          });
      } else {
        this.libroService.postAddLibro(this.formLibro.value).subscribe({
          next: (val: any) => {
            if (val.estado) {
              this.alert.sweet(
                'Registro Libro',
                'Se realizó correctamente.',
                'success'
              );
              this.limpiar();
              this.libroService.refresh = true;
            } else {
              this.alert.sweet(
                'Registro de Unidad',
                'No se pudo realizar el registro. ',
                'error'
              );
              this.limpiar();
              this.libroService.refresh = true;
            }
          },
        });
        this.isClicked = false;
        $('#modal-add-edit').modal('hide');
      }
    }
  }

  recoveryLibro() {
    if (this.item) {
      this.libroService.getByIDLibro(this.item.id).subscribe({
        next: (val: any) => {
          this.formLibro.patchValue(val.data);
        },
      });
    }
  }

  limpiar() {
    this.formLibro.reset();
    this.item = '';
    this.isClicked = false;
    this.clearItem.emit(true);
  }

  comboAutor() {
    this.AutorService.getComboAutor().subscribe({
      next: (val: any) => {
        this.autores = val;
      },
    });
  }
}
