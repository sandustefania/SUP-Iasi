import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { CursModel } from "../models/curs.model";

const router = Router();

//getAllCurs
router.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const cursuri = await CursModel.find(); //luam din DB
    res.send(cursuri);
  })
);

//getCursById
router.get(
  "/:cursId",
  expressAsyncHandler(async (req, res) => {
    const curs = await CursModel.findById(req.params.cursId);
    res.send(curs);
  })
);

export default router;
