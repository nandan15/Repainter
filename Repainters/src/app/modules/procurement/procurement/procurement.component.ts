import { Component } from '@angular/core';

@Component({
  selector: 'app-procurement',
  templateUrl: './procurement.component.html',
  styleUrls: ['./procurement.component.css']
})
export class ProcurementComponent {
  isSidebarExpanded = true;
  onSidebarToggle(isExpanded: boolean) {
    this.isSidebarExpanded = isExpanded;
  }
}