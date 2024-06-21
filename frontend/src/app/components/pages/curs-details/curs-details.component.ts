import { Component } from '@angular/core';
import { Curs } from '../../../shared/models/Curs';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { StarRatingConfigService, StarRatingModule } from 'angular-star-rating';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../services/cart.service';
import { NotFoundComponent } from '../../partials/not-found/not-found.component';
import { CursuriService } from '../../../services/cursuri.service';

@Component({
  selector: 'app-curs-details',
  standalone: true,
  imports: [StarRatingModule, CommonModule, RouterLink, NotFoundComponent],
  templateUrl: './curs-details.component.html',
  styleUrl: './curs-details.component.scss',
  providers: [StarRatingConfigService],
})
export class CursDetailsComponent {
  cursDetails!: Curs;

  constructor(
    private cursService: CursuriService,
    activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private router: Router
  ) {
    activatedRoute.params.subscribe((params) => {
      if (params.id)
        cursService.getCursById(params.id).subscribe((serverCurs) => {
          this.cursDetails = serverCurs;
        });
    });
  }

  addToCart() {
    this.cartService.addToCart(this.cursDetails);
    this.router.navigateByUrl('/cart-page');
  }
}
