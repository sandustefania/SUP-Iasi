import { Component } from '@angular/core';
import { SupService } from '../../../services/sup.service';
import { IEmail } from '../../../shared/interfaces/IEmail';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-emails-newsletter-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-emails-newsletter-page.component.html',
  styleUrl: './view-emails-newsletter-page.component.scss',
})
export class ViewEmailsNewsletterPageComponent {
  emails: IEmail[] = [];
  constructor(private supService: SupService) {}

  ngOnInit() {
    this.supService
      .getEmailNewsletter()
      .subscribe((serverEmails) => (this.emails = serverEmails));
  }
}
