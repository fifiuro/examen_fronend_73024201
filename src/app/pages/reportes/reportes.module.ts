import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResportesComponent } from './resportes.component';
import { ResportesVencidosComponent } from './resportes-vencidos/resportes-vencidos.component';
import { ResportesSegmentadosComponent } from './resportes-segmentados/resportes-segmentados.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReportesRoutingModule } from './reportes-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    ResportesComponent,
    ResportesVencidosComponent,
    ResportesSegmentadosComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    ReportesRoutingModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
  ],
})
export class ReportesModule {}
