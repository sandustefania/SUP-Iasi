import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { SupService } from '../../../services/sup.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-contact-us-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  templateUrl: './contact-us-page.component.html',
  styleUrl: './contact-us-page.component.scss',
})
export class ContactUsPageComponent {
  contactUsForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private supService: SupService,
    private router: Router,
    private toastrService: ToastrService,
    private userService: UserService
  ) {}

  ngOnInit() {
    const { name, email } = this.userService.currentUser;
    this.contactUsForm = this.formBuilder.group({
      name: ['' || name, Validators.required],
      email: ['' || email, [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  get fc() {
    return this.contactUsForm.controls;
  }

  submit() {
    this.supService
      .addMessage({
        name: this.fc.name.value,
        email: this.fc.email.value,
        message: this.fc.message.value,
      })
      .subscribe(() => {
        this.toastrService.success('Message SENT!');
        this.router.navigateByUrl('/');
      });
  }
}
