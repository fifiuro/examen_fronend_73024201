import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteListComponent } from './cliente-list/cliente-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ClienteRoutingModule } from './cliente-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';

@NgModule({
  declarations: [ClienteListComponent, ClienteFormComponent],
  imports: [
    SharedModule,
    CommonModule,
    ClienteRoutingModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ClienteModule {}
