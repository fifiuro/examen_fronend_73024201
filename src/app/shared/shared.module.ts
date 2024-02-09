import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoadTableComponent } from './components/load-table/load-table.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgSelectModule,
    CommonModule,
  ],
  declarations: [NavbarComponent, SidebarComponent, LoadTableComponent],
  exports: [NavbarComponent, SidebarComponent, LoadTableComponent],
  providers: [],
})
export class SharedModule {}
