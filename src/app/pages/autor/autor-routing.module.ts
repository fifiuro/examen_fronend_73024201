import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AutorComponent } from './autor.component';
import { AutorListComponent } from './autor-list/autor-list.component';

const routes: Routes = [
  {
    path: '',
    component: AutorComponent,
    children: [
      { path: '', redirectTo: 'autor-list', pathMatch: 'full' },
      { path: 'autor-list', component: AutorListComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AutorRoutingModule {}
