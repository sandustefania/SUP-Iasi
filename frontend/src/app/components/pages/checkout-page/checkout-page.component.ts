import { Component } from '@angular/core';
import { Order } from '../../../shared/models/Order';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CartService } from '../../../services/cart.service';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { OrderItemsListComponent } from '../../partials/order-items-list/order-items-list.component';
import { Router } from '@angular/router';
import { OrderService } from '../../../services/order.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PaypalButtonComponent } from '../../partials/paypal-button/paypal-button.component';

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    OrderItemsListComponent,
    MatInputModule,
    MatFormFieldModule,
    PaypalButtonComponent,
  ],
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.scss',
})
export class CheckoutPageComponent {
  order: Order = new Order();
  checkoutForm!: FormGroup;

  constructor(
    cartService: CartService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastrService: ToastrService,
    private router: Router,
    private orderService: OrderService
  ) {
    const cart = cartService.getCart();
    this.order.items = cart.items;
    this.order.totalPrice = cart.totalPrice;
  }

  ngOnInit(): void {
    let { name, phone } = this.userService.currentUser;
    this.checkoutForm = this.formBuilder.group({
      name: [name, Validators.required],
      phone: [phone, Validators.required],
    });
    this.createOrder();
  }

  get fc() {
    return this.checkoutForm.controls;
  }

  createOrder() {
    if (this.checkoutForm.invalid) {
      this.toastrService.warning('Please fill the inputs', 'Invalid Inputs');
      return;
    }

    this.order.name = this.fc.name.value;
    this.order.phone = this.fc.phone.value;
    this.orderService.create(this.order).subscribe({
      next: () => {
        console.log('IT WORKED'),
          //credentials to pay
          console.log(
            'email: sb-q47ynv29154651@personal.example.com, password: X!Ab4y$<'
          );
        //link figma
        //https://www.figma.com/file/Egy0UqiI7EJgAz3YnmmS2Z/Untitled?type=design&node-id=0-1&mode=design
      },
      error: (error) => {
        // this.toastrService.error(error.error, 'Cart');
      },
    });
  }
}
