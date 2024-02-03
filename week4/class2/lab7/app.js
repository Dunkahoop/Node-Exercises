import { port } from "./config.js";
import express from "express";
import router from "./routes.js";
const app = express();
app.use((req, res, next) => {
  console.log("Time:", new Date() + 3600000 * -5.0); // GMT-->EST
  next();
});
app.use("/api/codelookup", router);
app.use(express.static('public'));
app.use((err, req, res, next) => {
  // Do logging and user-friendly error message display
  console.error(err);
  res.status(500).send("internal server error");
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
