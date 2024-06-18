import { Component } from '@angular/core';
import { IReview } from '../../../shared/interfaces/IReview';
import { SupService } from '../../../services/sup.service';
import { CommonModule } from '@angular/common';
import { StarRatingConfigService, StarRatingModule } from 'angular-star-rating';
import { NgImageSliderModule } from 'ng-image-slider';

@Component({
  selector: 'app-view-reviews-page',
  standalone: true,
  imports: [CommonModule, StarRatingModule, NgImageSliderModule],
  templateUrl: './view-reviews-page.component.html',
  styleUrl: './view-reviews-page.component.scss',
  providers: [StarRatingConfigService],
})
export class ViewReviewsPageComponent {
  reviews: IReview[] = [];
  constructor(private supService: SupService) {}

  ngOnInit() {
    this.supService.getReviews().subscribe((serverReviews) => {
      this.reviews = serverReviews;
    });
  }
}
