import { model, Schema, Types } from "mongoose";
import { Event } from "./event.model";
import { EventSchema } from "./event.model";
import { OrderStatusEnum } from "../constants/order_status";

export interface OrderItem {
  event: Event;
  price: number;
  quantity: number;
}

export const OrderItemSchema = new Schema<OrderItem>({
  event: { type: EventSchema, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

export interface Order {
  id: string;
  items: OrderItem[];
  totalPrice: number;
  name: string;
  phone: string;
  paymentId: string;
  status: OrderStatusEnum;
  user: Types.ObjectId; //foreign key, for just the id
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new Schema<Order>(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    paymentId: { type: String },
    totalPrice: { type: Number, required: true },
    items: { type: [OrderItemSchema], required: true },
    status: { type: String, default: OrderStatusEnum.NEW },
    user: { type: Schema.Types.ObjectId, required: true },
  },
  {
    timestamps: true, //createdAt, updatedAt will be created automatically,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true, //id -->_id
    },
  }
);

export const OrderModel = model("order", orderSchema);
