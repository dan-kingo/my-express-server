import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/", (req, res) => {
  res.send("<h1>I have a reason...</h1>");
});

app.get("/silence", (req, res) => {
  res.send("<h3>I need to keep my reasons private for now!</h3>");
});

app.get("/calculator", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.post("/calculator", (req, res) => {
  let num1 = Number(req.body.num1);
  let num2 = Number(req.body.num2);
  let result = num1 + num2;

  res.send(`${num1} + ${num2} = ${result}`);
});
app.listen(3000, () => {
  console.log("Server started at port 3000!");
});
