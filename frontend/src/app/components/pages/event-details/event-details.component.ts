import { Component } from '@angular/core';
import { Event } from '../../../shared/models/Event';
import {
  ActivatedRoute,
  RouterLink,
  Router,
  NavigationEnd,
} from '@angular/router';
import { StarRatingConfigService, StarRatingModule } from 'angular-star-rating';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../services/cart.service';
import { NotFoundComponent } from '../../partials/not-found/not-found.component';
import { EventService } from '../../../services/event.service';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [StarRatingModule, CommonModule, RouterLink, NotFoundComponent],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.scss',
  providers: [StarRatingConfigService],
})
export class EventDetailsComponent {
  eventDetails!: Event;

  constructor(
    private eventService: EventService,
    activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private router: Router
  ) {
    activatedRoute.params.subscribe((params) => {
      if (params.id)
        eventService.getEventById(params.id).subscribe((serverEvent) => {
          this.eventDetails = serverEvent;
        });
    });
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }

  addToCart() {
    this.cartService.addToCart(this.eventDetails);
    this.router.navigateByUrl('/cart-page');
  }
}
