import { generateToken } from "../JWT/JWT.js";
import userModel from "../model/userSchema.js";
import bcrypt from "bcrypt";

//----------------------------------------------------REGISTRATION-------------------------------------------------------
export const userRegister = async (req, res) => {
  try {
    const { userName, password, email } = req.body;

    //checking if there is already a user with the email
    const user = await userModel.findOne({ email });

    if (user) {
      //user already exist
      res
        .status(200)
        .json({ ok: false, message: "user with this email already exists" });
    } else {
      //encrypting the password
      const hash = await bcrypt.hash(password, 10);
      const newUser = new userModel({
        userName,
        email,
        password: hash,
      });

      const savedUser = await newUser.save();
      const token = generateToken({
        userId: savedUser._id,
      });

      res
        .status(200)
        .json({ ok: true, token, message: "registration success" });
    }
  } catch (err) {
    res.status(500);
  }
};



//-----------------------------------------------SIGN_IN------------------------------------------------------------------------
export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    //finding user with the email
    const user = await userModel.findOne({ email });

    if (user) {
      //checking password
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        const token = generateToken({
          userId: user._id,
        });

        res.status(200).json({ ok: true, token, message: "log in success" });
      } else {
        //if the passwords dont match
        res.status(200).json({ ok: false, message: "incorrect password" });
      }
    } else {
      //if no user found with the provided email
      res
        .status(200)
        .json({ ok: false, message: "no user found with this email" });
    }
  } catch (err) {
    res.status(500);
  }
};
