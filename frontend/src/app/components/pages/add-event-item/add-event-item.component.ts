import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SupService } from '../../../services/sup.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { GoogleMapsModule } from '@angular/google-maps';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-event-item',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    GoogleMapsModule,
  ],
  templateUrl: './add-event-item.component.html',
  styleUrl: './add-event-item.component.scss',
})
export class AddEventItemComponent {
  addItemForm!: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private supService: SupService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.addItemForm = this.fb.group({
      name: ['', [Validators.required]],
      locatie: ['', [Validators.required]],
      data: ['', [Validators.required]],
      ora: ['', [Validators.required]],
      pret: ['', [Validators.required]],
      nrLocuri: ['', [Validators.required]],
      image: [null, [Validators.required]],
    });
  }

  get fc() {
    return this.addItemForm.controls;
  }

  uploadImage(event: any) {
    const file = (event.target as HTMLInputElement).files![0];
    this.addItemForm.patchValue({ image: file });
    this.addItemForm.get('image')!.updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  submit() {
    const formData = new FormData();
    formData.append('name', this.addItemForm.get('name')?.value);
    formData.append('locatie', this.addItemForm.get('locatie')?.value);
    formData.append('data', this.addItemForm.get('data')?.value);
    formData.append('ora', this.addItemForm.get('ora')?.value);
    formData.append('pret', this.addItemForm.get('pret')?.value);
    formData.append('nrLocuri', this.addItemForm.get('nrLocuri')?.value);
    formData.append('image', this.addItemForm.get('image')?.value);

    this.supService.addEventItem(formData).subscribe({
      next: () => this.router.navigateByUrl('/'),
      error: (error) => {
        this.toastrService.error(error.error, 'Error');
      },
    });
  }
}
