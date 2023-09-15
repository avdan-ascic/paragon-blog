import mongoose from "mongoose";

import app from "./App";
import config from "./config";

app.listen(config.port, (err) => {
  if (err) return console.log(err);
  console.log(`Server started on port ${config.port}`);
});

mongoose
  .connect(config.mongo)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log(err));
