import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SupService } from '../../../services/sup.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ViewReviewsPageComponent } from '../view-reviews-page/view-reviews-page.component';
import { UserService } from '../../../services/user.service';
import { IReview } from '../../../shared/interfaces/IReview';
import { StarRatingConfigService, StarRatingModule } from 'angular-star-rating';

@Component({
  selector: 'app-reviews-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ViewReviewsPageComponent,
    StarRatingModule,
  ],
  templateUrl: './reviews-page.component.html',
  styleUrl: './reviews-page.component.scss',
  providers: [StarRatingConfigService],
})
export class ReviewsPageComponent {
  reviewForm!: FormGroup;
  reviews: IReview[] = [];
  averageRating!: any;
  reviewsCount!: number;

  constructor(
    private fb: FormBuilder,
    private supService: SupService,
    private toastrService: ToastrService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.supService.getReviews().subscribe((serverReviews) => {
      (this.reviews = serverReviews), this.calculateTotalRating();
    });

    const { name, email } = this.userService.currentUser;

    this.reviewForm = this.fb.group({
      name: ['' || name, Validators.required],
      email: ['' || email, [Validators.required, Validators.email]],
      review: ['', Validators.required],
      rating: [null, Validators.required],
    });
  }

  get fc() {
    return this.reviewForm.controls;
  }

  calculateTotalRating() {
    const totalRating = this.reviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    this.reviewsCount = this.reviews.length;
    this.averageRating = (totalRating / this.reviewsCount).toFixed(2);
  }

  submit() {
    this.supService
      .addReview({
        name: this.fc.name.value,
        email: this.fc.email.value,
        review: this.fc.review.value,
        rating: this.fc.rating.value,
      })
      .subscribe(() => {
        this.toastrService.success('Review SENT!');
        this.router.navigateByUrl('/');
      });
  }
}
