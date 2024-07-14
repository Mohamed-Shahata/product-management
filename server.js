const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const productRouter = require("./Routes/productRoutes.js");
const path = require("path");
const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname , "images")));

const PORT = 3000;
mongoose.connect("mongodb://localhost:27017/products").then(() => {
  console.log("MongoDB Is Connected");
});

app.use("/api/products" , productRouter);

app.listen(PORT , () => {
  console.log(`Server Is Live On Port ${PORT}`);
});