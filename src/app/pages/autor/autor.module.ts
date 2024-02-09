import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutorComponent } from './autor.component';
import { AutorListComponent } from './autor-list/autor-list.component';
import { AutorFormComponent } from './autor-form/autor-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AutorRoutingModule } from './autor-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';



@NgModule({
  declarations: [
    AutorComponent,
    AutorListComponent,
    AutorFormComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    AutorRoutingModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule
  ]
})
export class AutorModule { }
