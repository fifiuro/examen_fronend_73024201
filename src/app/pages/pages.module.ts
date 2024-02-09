import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ClienteComponent } from './cliente/cliente.component';

@NgModule({
  declarations: [PagesComponent, ClienteComponent],
  imports: [CommonModule, SharedModule, PagesRoutingModule],
})
export class PagesModule {}
