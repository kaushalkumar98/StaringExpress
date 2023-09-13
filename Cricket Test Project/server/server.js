const express = require("express");
const cors = require("cors");
const routes = require("./routes/index");

const app = express();
app.use(express.json());

app.get("/", (req, res, next) => {
  res.send("Hello From Express!");
});
app.use(
  "/api/players",
  cors({
    origin: "http://localhost:5173",
  }),
  routes
);
app.listen(3000, () => console.log("Server Started at Port: 3000"));
