import { Component } from '@angular/core';
import { IRentSup } from '../../../shared/interfaces/IRentSup';
import { SupService } from '../../../services/sup.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-rent-sup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-rent-sup.component.html',
  styleUrl: './view-rent-sup.component.scss',
})
export class ViewRentSupComponent {
  rentSups: IRentSup[] = [];
  constructor(private supService: SupService) {}

  ngOnInit() {
    this.supService.getRentSup().subscribe((serverRentSups) => {
      this.rentSups = serverRentSups;
    });
  }
}
