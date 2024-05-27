import express from "express";
import path from "path";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || "5000";
app.use(bodyParser.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("^/$|/bmi(.html)?", (req, res) => {
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

// route handler
app.get(
  "/about(.html)?",
  (req, res, next) => {
    console.log("next is called!");
    next();
  },
  (req, res) => {
    res.send("<h2>Here we go ...</h2>");
  }
);

// we can use also route chaining

const one = (req, res, next) => {
  console.log("one!");
  next();
};
const two = (req, res, next) => {
  console.log("two!");
  next();
};
const three = (req, res) => {
  console.log("three!");
  res.send("<h3>This is what i do!</h3>");
};

app.get("/chain(.html)?", [one, two, three]);

app.get("/*", (req, res) => {
  res.status(404).send("<h2>404 page not found!</h2>");
});

app.listen(PORT, () => {
  console.log("server started at 5000!");
});
