const express = require("express");
const mongoose = require("mongoose");
const { port, host, db, authApiUrl } = require("./configuration");
const { connectDb } = require("./helpers/db");

const app = express();
const kittySchema = new mongoose.Schema({
  name: String
});
const Kitten = mongoose.model("Kitten", kittySchema);

app.get("/test", (req, res) => {
  res.send("Our api server is working correctly");
});

const startServer = () => {
  app.listen(port, async () => {
    console.log(`Started api service on port ${port}`);
    console.log(`Our host is ${host}`);
    console.log(`Database url ${db}`);
    console.log(`Auth api url ${authApiUrl}`)

    try {
      const silence = new Kitten({ name: "Silence" });
      const result = await silence.save();  // <-- Fix: Use async/await
      console.log("result", result);
    } catch (err) {
      console.error("Error saving kitten:", err);
    }
  });
};

connectDb()
  .on("error", console.log)
  .on("disconnected", connectDb)
  .once("open", startServer);
