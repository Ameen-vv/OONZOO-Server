import express from "express";
import { getProducts } from "../controllers/productController.js";
import { userAuthorization } from "../middlewares/authorization.js";
const router = express.Router();

router.get("/",userAuthorization ,getProducts);

export default router;
 