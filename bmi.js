import express from "express";
import path from "path";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "bmi.html"));
});

app.post("/", (req, res) => {
  let weight = Number(req.body.weight);
  let height = Number(req.body.height);
  height = 0.01 * height;
  let result = weight / Math.pow(height, 2);
  result = result.toFixed(2);

  res.send(
    `<h3>the BMI of a person with weight ${weight}kg and height ${height}cm is ${result}</h3>`
  );
});

app.listen("5000", () => {
  console.log("server started at 5000!");
});
