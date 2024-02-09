import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ResportesComponent } from './resportes.component';
import { ResportesVencidosComponent } from './resportes-vencidos/resportes-vencidos.component';
import { ResportesSegmentadosComponent } from './resportes-segmentados/resportes-segmentados.component';

const routes: Routes = [
  {
    path: '',
    component: ResportesComponent,
    children: [
      { path: 'reporte-vencido', component: ResportesVencidosComponent },
      { path: 'reporte-sergmentados', component: ResportesSegmentadosComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportesRoutingModule {}
