import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PrestamosComponent } from './prestamos.component';
import { PrestamosListComponent } from './prestamos-list/prestamos-list.component';

const routes: Routes = [
  {
    path: '',
    component: PrestamosComponent,
    children: [
      { path: '', redirectTo: 'prestamo-list', pathMatch: 'full' },
      { path: 'prestamo-list', component: PrestamosListComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PresatmosRoutingModule {}
