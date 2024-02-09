import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrestamosComponent } from './prestamos.component';
import { PrestamosListComponent } from './prestamos-list/prestamos-list.component';
import { PrestamosFormComponent } from './prestamos-form/prestamos-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PresatmosRoutingModule } from './prestamos-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    PrestamosComponent,
    PrestamosListComponent,
    PrestamosFormComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    PresatmosRoutingModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
  ],
})
export class PrestamosModule {}
