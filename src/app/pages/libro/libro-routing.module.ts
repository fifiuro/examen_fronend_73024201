import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LibroListComponent } from './libro-list/libro-list.component';
import { LibroComponent } from './libro.component';

const routes: Routes = [
  {
    path: '',
    component: LibroComponent,
    children: [
      { path: '', redirectTo: 'libro-list', pathMatch: 'full' },
      { path: 'libro-list', component: LibroListComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LibroRoutingModule {}
