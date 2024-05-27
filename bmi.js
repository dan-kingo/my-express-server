import express from "express";
import path from "path";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import cors from "cors";
const app = express();
const PORT = process.env.PORT || "5000";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// using built in middleware
app.use(express.static(path.join(__dirname, "/public")));

// using third party middleware
app.use(bodyParser.urlencoded({ extended: true }));

// using cross orign resource sharing (CORS) third-party middleware

const whitelist = [
  "https://abrshtsegaye.onrender.com",
  "http://127.0.0.1:5500",
  "http://localhost:5000",
];

const corsOptions = {
  origin: (origin, callback) => {
    console.log(`Origin : ${origin}`);
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS!"));
    }
  },
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

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
    `<h3>the BMI of a person with weight ${weight}kg and height ${height}m is ${result}</h3>`
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

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.send("<h2>404 page not found!</h2>");
  } else if (req.accepts("json")) {
    res.json({ err: "404 Not Found!" });
  } else {
    res.type("text").send("404 Not Found!");
  }
});

app.use((err, req, res, next) => {
  res.status(500).send(err.message);
});
app.listen(PORT, () => {
  console.log("server started at 5000!");
});
