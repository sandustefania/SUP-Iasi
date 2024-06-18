import { Router } from "express";
import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";
import { User, UserModel } from "../models/user.model";
import { HTTP_BAD_REQUEST } from "../constants/http_status";
import bcrypt from "bcryptjs";

const router = Router();

router.post(
  "/login",
  expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    //admin
    if (user?.email === "dragos@gmail.com") {
      res.send(generateTokenResponse(user));
      return;
    }
    //trebuie comparata parola introdusa cu parola cryptata din bd
    if (user && (await bcrypt.compare(password, user.password))) {
      res.send(generateTokenResponse(user));
    } else {
      res.status(HTTP_BAD_REQUEST).send("User name or password is not valid!");
    }
  })
);

router.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    const { name, email, phone, password } = req.body;
    const user = await UserModel.findOne({ email }); //verificam daca exista deja un user cu acest email
    if (user) {
      // res.status(400)
      res.status(HTTP_BAD_REQUEST).send("Users already exists, please login!");
      return;
    }

    //encrypt the password before saving
    const encryptedPassword = await bcrypt.hash(password, 10);

    const newUser: User = {
      id: "",
      name: name,
      phone: phone,
      email: email.toLowerCase(),
      password: encryptedPassword,
      //orice new user e admin
      isAdmin: false,
    };
    const dbUser = await UserModel.create(newUser); //o sa genereze automat id-ul
    res.send(generateTokenResponse(dbUser));
  })
);

//JWT token
const generateTokenResponse = (user: any) => {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET!,
    { expiresIn: "30d" }
  );

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    phone: user.phone,
    isAdmin: user.isAdmin,
    token: token,
  };
};

export default router;
