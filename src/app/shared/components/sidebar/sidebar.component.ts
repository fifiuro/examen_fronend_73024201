import { Component } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  ngOnInit() {
    $('[data-widget="treeview"]').Treeview('init');
  }
}
