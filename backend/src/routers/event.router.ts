import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { EventModel } from "../models/event.model";

const router = Router();

//getAllEvent
router.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const events = await EventModel.find(); //luam din DB
    res.send(events);
  })
);

//getEventById
router.get(
  "/:eventId",
  expressAsyncHandler(async (req, res) => {
    const event = await EventModel.findById(req.params.eventId);
    res.send(event);
  })
);

export default router;
