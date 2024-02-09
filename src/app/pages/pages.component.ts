import { Component } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css'],
})
export class PagesComponent {
  menu: any;

  constructor(private router: Router) {}

  ngOnInit() {
    $('[data-widget="treeview"]').Treeview('init');
    $('[data-widget="nav-treeview"]').Treeview('init');
  }
}
