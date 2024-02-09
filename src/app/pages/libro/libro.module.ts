import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibroComponent } from './libro.component';
import { LibroListComponent } from './libro-list/libro-list.component';
import { LibroFormComponent } from './libro-form/libro-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LibroRoutingModule } from './libro-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [LibroComponent, LibroListComponent, LibroFormComponent],
  imports: [
    SharedModule,
    CommonModule,
    LibroRoutingModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
  ],
})
export class LibroModule {}
