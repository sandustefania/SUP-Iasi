"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = exports.OrderItemSchema = void 0;
var mongoose_1 = require("mongoose");
var event_model_1 = require("./event.model");
var order_status_1 = require("../constants/order_status");
exports.OrderItemSchema = new mongoose_1.Schema({
    event: { type: event_model_1.EventSchema, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
});
var orderSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    paymentId: { type: String },
    totalPrice: { type: Number, required: true },
    items: { type: [exports.OrderItemSchema], required: true },
    status: { type: String, default: order_status_1.OrderStatusEnum.NEW },
    user: { type: mongoose_1.Schema.Types.ObjectId, required: true },
}, {
    timestamps: true, //createdAt, updatedAt will be created automatically,
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true, //id -->_id
    },
});
exports.OrderModel = (0, mongoose_1.model)("order", orderSchema);
