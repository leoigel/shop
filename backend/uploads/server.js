const express = require("express");
const path = require('path')
const colors = require("colors");
const dotenv = require("dotenv");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const uploadRoutes = require('./routes/uploadRoutes')
const connectDB = require("./config/db.js.js");
dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use('/api/upload', uploadRoutes)
app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);
console.log(path.join(__dirname,'/uploads'))
app.use('/uploads', express.static(path.join(__dirname,'dfffffffffffffff'+'/uploads')))
const PORT = process.env.PORT || 5027;
app.listen(5027, () => console.log(`server is running ${PORT}`.yellow.bold));