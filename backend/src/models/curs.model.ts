import { Schema, model } from "mongoose";

export interface Curs {
  id: string;
  name: string;
  locatie: string;
  durata: string;
  ora: string;
  price: number;
  varsta: string;
  imageUrl: string;
}

export const CursSchema = new Schema<Curs>(
  {
    name: { type: String, required: true },
    locatie: { type: String, required: true },
    durata: { type: String, required: true },
    ora: { type: String, required: true },
    price: { type: Number, required: true },
    varsta: { type: String, required: true },
    imageUrl: { type: String, required: true },
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

export const CursModel = model<Curs>("curs", CursSchema);
