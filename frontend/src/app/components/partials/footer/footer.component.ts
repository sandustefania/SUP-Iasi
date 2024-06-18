import { Component } from '@angular/core';
import { SupService } from '../../../services/sup.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();

  constructor(
    private supService: SupService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  addEmailNewsletter(email: string) {
    this.supService.addEmailNewsletter({ email }).subscribe(() => {
      this.toastrService.success('Review SENT!');
      this.router.navigateByUrl('/');
    });
  }
}
