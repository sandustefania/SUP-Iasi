import { Schema, model } from "mongoose";

export interface Event {
  id: string;
  name: string;
  locatie: string;
  data: string;
  ora: string;
  price: number;
  tags: string[];
  imageUrl: string;
  nrLocuri: string;
}

export const EventSchema = new Schema<Event>(
  {
    name: { type: String, required: true },
    locatie: { type: String, required: true },
    data: { type: String, required: true },
    ora: { type: String, required: true },
    price: { type: Number, required: true },
    tags: { type: [String] },
    imageUrl: { type: String, required: true },
    nrLocuri: { type: String },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
);

export const EventModel = model<Event>("event", EventSchema);
