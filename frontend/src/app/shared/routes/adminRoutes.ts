import { Route } from '@angular/router';
import { AdminPageComponent } from '../../components/pages/admin-page/admin-page.component';
import { ViewMessagesPageComponent } from '../../components/pages/view-messages-page/view-messages-page.component';
import { ViewReviewsPageComponent } from '../../components/pages/view-reviews-page/view-reviews-page.component';
import { ViewEmailsNewsletterPageComponent } from '../../components/pages/view-emails-newsletter-page/view-emails-newsletter-page.component';
import { AddEventItemComponent } from '../../components/pages/add-event-item/add-event-item.component';
import { ViewRentSupComponent } from '../../components/pages/view-rent-sup/view-rent-sup.component';

export const ADMIN_ROUTES: Route[] = [
  { path: '', component: AdminPageComponent },
  { path: 'add-event-item', component: AddEventItemComponent },
  { path: 'view-reviews', component: ViewReviewsPageComponent },
  { path: 'view-messages', component: ViewMessagesPageComponent },
  {
    path: 'view-emails-newsletter',
    component: ViewEmailsNewsletterPageComponent,
  },
  { path: 'view-rent-sup', component: ViewRentSupComponent },
];
