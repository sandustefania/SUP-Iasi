import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { ContactUsModel } from "../models/contactUs.model";
import { ReviewModel } from "../models/review.model";
import { EmailNewsletterModel } from "../models/emailNewsletter.model";
import multer from "multer";
import path from "path";
import axios from "axios";
import { RentSupModel } from "../models/rentSups.model";
import { HTTP_BAD_REQUEST } from "../constants/http_status";
import { EventModel } from "../models/event.model";
const upload = require("../configs/multerConfig");
const router = Router();

// Route handler for adding message with image upload
router.post("/addEventItem", upload.single("image"), async (req, res) => {
  try {
    const imageUrl = req.file
      ? `/uploads/${req.file.filename}`
      : "assets/images/photos/default-image.png";

    const item = new EventModel({
      name: req.body.name,
      locatie: req.body.locatie,
      data: req.body.data,
      ora: req.body.ora,
      price: req.body.pret,
      nrLocuri: req.body.nrLocuri,
      imageUrl: imageUrl,
    });
    await item.save();
    res.status(201).json({ message: "Item added successfully", item });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
});

router.get("/weather", async (req, res) => {
  try {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Iasi&appid=b993d6e9316969e06980ea5c8dd76d80&units=metric`;
    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    console.error(`Error fetching weather data`);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

router.delete(
  "/deleteEventItem/:eventId",
  expressAsyncHandler(async (req, res) => {
    const item = await EventModel.findByIdAndDelete(req.params.eventId);
    res.send(item);
  })
);

router.post(
  "/addMessage",
  expressAsyncHandler(async (req, res) => {
    const { name, email, message } = req.body;

    // await ContactUsModel.create(message);
    const addMessage = new ContactUsModel({ name, email, message });
    await addMessage.save();
    res.send(addMessage);
  })
);

router.get(
  "/getMessages",
  expressAsyncHandler(async (req, res) => {
    const messages = await ContactUsModel.find();
    res.send(messages);
  })
);

router.post(
  "/addReview",
  expressAsyncHandler(async (req, res) => {
    const { name, email, review, rating } = req.body;
    const addReview = new ReviewModel({ name, email, review, rating });
    await addReview.save();
    res.send(addReview);
  })
);

router.get(
  "/getReviews",
  expressAsyncHandler(async (req, res) => {
    const reviews = await ReviewModel.find();
    res.send(reviews);
  })
);

router.post(
  "/addEmailNewsletter",
  expressAsyncHandler(async (req, res) => {
    const { email } = req.body;
    const addEmailNewsletter = new EmailNewsletterModel({ email });
    await addEmailNewsletter.save();
    res.send(addEmailNewsletter);
  })
);

router.get(
  "/getEmailNewsletter",
  expressAsyncHandler(async (req, res) => {
    const emails = await EmailNewsletterModel.find();
    res.send(emails);
  })
);

router.post("/addRentSup", async (req, res) => {
  const { numberSups, selectedDate, userName, userEmail, userPhone } = req.body;
  const convertNumberSups = parseInt(numberSups);

  try {
    const date = new Date(selectedDate);
    const existingRecord = await RentSupModel.find({ selectedDate: date });
    if (existingRecord) {
      const totalSups = existingRecord.reduce(
        (total, order) => total + order.numberSups,
        0
      );
      if (totalSups + convertNumberSups > 10) {
        return res
          .status(HTTP_BAD_REQUEST)
          .send(`Numarul total de SUP-uri ramase este ${10-totalSups}`);
      } else {
        const newSup = new RentSupModel({
          numberSups: convertNumberSups,
          selectedDate: date,
          userName,
          userEmail,
          userPhone,
        });
        await newSup.save();
      }
    } else {
      const newSup = new RentSupModel({
        numberSups: convertNumberSups,
        selectedDate: date,
        userName,
        userEmail,
        userPhone,
      });
      await newSup.save();
    }

    res.status(200).json({ message: "Data added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
});

router.get(
  "/getRentSup",
  expressAsyncHandler(async (req, res) => {
    const rentSups = await RentSupModel.find();
    res.send(rentSups);
  })
);

router.get("/getSupsAvailable/:date", async (req, res) => {
  const { date } = req.params;
  console.log(date);

  try {
    const selectedDate = new Date(date);
    const existingRecord = await RentSupModel.find({
      selectedDate: selectedDate,
    });

    const totalSups = existingRecord.reduce(
      (total, order) => total + order.numberSups,
      0
    );
    const availableSups = 10 - totalSups;
    res.status(200).json({ availableSups });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
});

export default router;
