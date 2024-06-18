import { Component } from '@angular/core';
import { SupService } from '../../../services/sup.service';
import { CommonModule } from '@angular/common';
import { IContactUs } from '../../../shared/interfaces/IContactUs';

@Component({
  selector: 'app-view-messages-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-messages-page.component.html',
  styleUrl: './view-messages-page.component.scss',
})
export class ViewMessagesPageComponent {
  messages: IContactUs[] = [];

  constructor(private supService: SupService) {}

  ngOnInit() {
    this.supService
      .getMessages()
      .subscribe((serverMessages) => (this.messages = serverMessages));
  }
}
