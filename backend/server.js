const express = require("express");
const path = require('path')
const colors = require("colors");
const dotenv = require("dotenv");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const uploadRoutes = require('./routes/uploadRoutes')
const connectDB = require("./config/db.js");
dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use('/api/uploads', uploadRoutes);
app.use("/api/orders", orderRoutes);
app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);


app.use('/uploads', express.static(path.join(__dirname,'/uploads')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join('frontend/build')));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + '/frontend/build/index.html'));
});
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

const PORT = process.env.PORT || 5000;
app.listen(5027, () => console.log(`server is running ${PORT}`.yellow.bold));