require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require("./routes/product");
const retailBillRoutes = require("./routes/retailBill");
const wholeSaleBillRoutes = require("./routes/wholeSaleBill");
const stockRoutes = require("./routes/stock");
const collectionRoutes = require("./routes/collection");
const clientRoutes = require("./routes/client");
const purchaseRoutes = require("./routes/purchase");
const adminRoutes = require("./routes/admin");
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL, // Replace with the URL of your client application
    credentials: true, // Enable credentials (cookies) support
  })
);
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("connection sucessful"))
  .catch((err) => console.log(err));
app.use("/api/product", productRoutes);
app.use("/api/retail", retailBillRoutes);
app.use("/api/stock", stockRoutes);
app.use("/api/wholesale", wholeSaleBillRoutes);
app.use("/api/collection", collectionRoutes);
app.use("/api/client", clientRoutes);
app.use("/api/purchase", purchaseRoutes);
app.use("/api/admin", adminRoutes);
app.get("/", (req, res) => {
  res.send("listining from other side");
});

const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
