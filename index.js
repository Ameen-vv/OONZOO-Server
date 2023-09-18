import express from "express";
import logger from "morgan";
import userRoute from "./routes/user.js";
import productRoute from "./routes/product.js";
import cors from "cors";
import dotenv from "dotenv";
import connection from "./config/config.js";
dotenv.config();

const app = express();

//-----------------------------------APPLICATION_MIDDLEWARES-----------------------------------------------------------------
app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);
app.use(logger("dev"));
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
    allowedHeaders: ["Content-type", "Access", "Authorization"],
  })
);
connection();

//---------------------------------------ROUTES----------------------------------------------------------------------------
app.use("/", userRoute);
app.use("/products", productRoute);

app.listen(2000, () => console.log("server connected to port 2000"));
