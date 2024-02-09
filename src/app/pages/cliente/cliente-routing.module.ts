import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from './cliente.component';
import { ClienteListComponent } from './cliente-list/cliente-list.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: ClienteComponent,
    children: [
      { path: '', redirectTo: 'clientes-list', pathMatch: 'full' },
      { path: 'clientes-list', component: ClienteListComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClienteRoutingModule {}
