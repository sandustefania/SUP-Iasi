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

const router = Router();

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

// Route handler for adding message with image upload
router.post("/addEventItem", upload.single("imageUrl"), async (req, res) => {
  const { name, price } = req.body;
  const imageUrl = req.file ? req.file.path : "";

  try {
    const addEventItem = new EventModel({ name, price, imageUrl });
    await addEventItem.save();
    res.send(addEventItem);
  } catch (err) {
    res.status(500).send(err);
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
          .send("Total number of sups exceeds 10.");
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

router.get("/getSupsAvailable", async (req, res) => {
  const { numberSups, selectedDate } = req.body;
  const convertNumberSups = parseInt(numberSups);
  const existingRecord = await RentSupModel.find({
    selectedDate: selectedDate,
  });
  if (existingRecord) {
    const totalSups = existingRecord.reduce(
      (total, order) => total + order.numberSups,
      0
    );
    if (totalSups >= 10) {
      return res.status(400).send("No Sups Available");
    } else {
      console.log(10 - totalSups);
      return res.send(10 - totalSups);
    }
  }
  res.send();
});

export default router;
