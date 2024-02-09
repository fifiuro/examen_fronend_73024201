import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { HomeComponent } from '../shared/components/home/home.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: '', component: HomeComponent },
      {
        path: 'clientes',
        loadChildren: () =>
          import('./cliente/cliente.module').then((m) => m.ClienteModule),
      },
      {
        path: 'libro',
        loadChildren: () =>
          import('./libro/libro.module').then((m) => m.LibroModule),
      },
      {
        path: 'prestamos',
        loadChildren: () =>
          import('./prestamos/prestamos.module').then((m) => m.PrestamosModule),
      },
      {
        path: 'autor',
        loadChildren: () =>
          import('./autor/autor.module').then((m) => m.AutorModule),
      },
      {
        path: 'reportes',
        loadChildren: () =>
          import('./reportes/reportes.module').then((m) => m.ReportesModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
