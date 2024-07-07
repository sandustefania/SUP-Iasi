import dotenv from "dotenv";

dotenv.config();
// process.env.MONGO_URI; //i have access to .env file

import express from "express";
import cors from "cors";
import userRouter from "./routers/user.router";
import { dbConnect } from "./configs/database.config";
import orderRouter from "./routers/order.router";
import supRouter from "./routers/sup.router";
import path from "path";
import eventRouter from "./routers/event.router";
import cursRouter from "./routers/curs.router";

dbConnect();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cors for development time (localhost:4200--->localhost:5000)
app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:4200",
      "https://therestaurant-k8mq.onrender.com",
    ],
  })
);

app.use("/api/events", eventRouter);
app.use("/api/cursuri", cursRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/sup", supRouter);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(express.static("public/browser"));
app.get("*", (req, res) => {
  const htmlfile = path.join(__dirname, "public", "browser", "index.html");
  res.sendFile(htmlfile);
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Website served on http://localhost:" + port);
});
