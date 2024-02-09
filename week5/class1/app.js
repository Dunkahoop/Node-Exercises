import { port } from "./config.js";
import express from "express";
import user_router from "./user_routes.js";

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json()) // To parse the incoming requests with JSON payloads
app.use("/api/users", user_router);
app.use((req, res, next) => {
  console.log("Time:", new Date() + 3600000 * -5.0); // GMT-->EST
  next();
});
app.use(express.static('public'));
app.use((err, req, res, next) => {
  // Do logging and user-friendly error message display
  console.error(err);
  res.status(500).send("internal server error");
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
