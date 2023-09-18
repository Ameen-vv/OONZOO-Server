import jwt from "jsonwebtoken";
import userModel from "../model/userSchema.js";

export const userAuthorization = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(' ')[1];
    if (token) {
      try {
        const result = jwt.verify(token, process.env.TOKEN_SECRET);
        const user = await userModel.findOne({ _id: result.userId });

        if (user) {
          next();
        } else {
          res.status(401).json({ authorization: false });
        }
      } catch (err) {
        res.status(401).json({ authorization: false });
      }
    } else {
      res.status(401).json({ authorization: false });
    }
  } catch (err) {
    res.status(500);
  }
};
