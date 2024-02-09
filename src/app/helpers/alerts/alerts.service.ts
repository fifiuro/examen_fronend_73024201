import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AlertsService {
  constructor(private toastr: ToastrService) {}

  toast(mensaje: string, titulo: string, tipo: string) {
    switch (tipo) {
      case 'error':
        this.toastr.error(titulo, mensaje, {
          closeButton: true,
        });
        break;
      case 'success':
        this.toastr.success(titulo, mensaje, {
          closeButton: true,
        });
        break;
      case 'warning':
        this.toastr.warning(titulo, mensaje, {
          closeButton: true,
        });
        break;
      case 'info':
        this.toastr.info(titulo, mensaje, {
          closeButton: true,
        });
        break;
      default:
        break;
    }
  }

  sweet(titulo: string, mensaje: string, tipo: string) {
    switch (tipo) {
      case 'error':
        Swal.fire(titulo, mensaje, 'error');
        break;
      case 'success':
        Swal.fire(titulo, mensaje, 'success');
        break;
      case 'warning':
        Swal.fire(titulo, mensaje, 'warning');
        break;
      case 'info':
        Swal.fire(titulo, mensaje, 'info');
        break;
      default:
        break;
    }
  }

  async sweetInput(title: string, label: string, value: string) {
    const { value: text } = await Swal.fire({
      title: title,
      input: 'text',
      inputValue: value,
      inputLabel: label,
      inputPlaceholder: label,
    });

    if (text) {
      return text;
    }
  }

  sweetConfirm(
    title: string,
    text: string,
    btn_confirm: string,
    btn_cancel: string,
    txt_confirm: string,
    txt_cancel: string,
    event: any
  ) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: title,
        text: text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: btn_confirm,
        cancelButtonText: btn_cancel,
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          event.item.remove();
          swalWithBootstrapButtons.fire('Eliminado!', txt_confirm, 'success');
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire('Cancelado', txt_cancel, 'error');
        }
      });
  }

  async sweetConfirmDelete(
    title: string,
    text: string,
    btn_confirm: string,
    textConfirmado: string
  ) {
    let uno;
    await Swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: btn_confirm,
    }).then((result) => {
      uno = result.isConfirmed;
      if (result.isConfirmed) {
        Swal.fire('Eliminado!', textConfirmado, 'success');
      }
    });
    return uno;
  }
}
