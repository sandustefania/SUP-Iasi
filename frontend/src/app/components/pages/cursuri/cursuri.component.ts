import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterModule,
} from '@angular/router';
import { StarRatingConfigService, StarRatingModule } from 'angular-star-rating';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { SupService } from '../../../services/sup.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../services/user.service';
import { NotFoundComponent } from '../../partials/not-found/not-found.component';
import { CursuriService } from '../../../services/cursuri.service';
import { Curs } from '../../../shared/models/Curs';

@Component({
  selector: 'app-cursuri',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    StarRatingModule,
    FormsModule,
    NotFoundComponent,
    RouterModule,
  ],
  templateUrl: './cursuri.component.html',
  styleUrl: './cursuri.component.scss',
  providers: [StarRatingConfigService],
})
export class CursuriComponent {
  cursuri: Curs[] = [];
  constructor(
    public userService: UserService,
    private cursuriService: CursuriService,
    private supService: SupService,
    private toastrService: ToastrService,
    activatedRoute: ActivatedRoute,
    public router: Router
  ) {
    let cursuriObservable: Observable<Curs[]>;
    activatedRoute.params.subscribe((params) => {
      cursuriObservable = cursuriService.getAll();

      cursuriObservable.subscribe((serverCursuri) => {
        this.cursuri = serverCursuri;
      });
    });
  }

  ngOnInit() {}

  // deleteItem(eventId: any) {
  //   this.supService.deleteEventItem(eventId).subscribe({
  //     next: () => {
  //       this.toastrService.success('Item deleted');
  //       this.cursuriService.getAll().subscribe((serverCursuri) => {
  //         this.cursuri = serverCursuri;
  //       });
  //     },
  //     error: (error) => {
  //       this.toastrService.error(error.error, 'Cart');
  //     },
  //   });
  // }
}
