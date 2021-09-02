const express = require("express");
const app = express();
const port = process.env.PORT || process.env.port || 5000;
const cors = require("cors");
const bodyParser = require("body-parser");
const package = require("./package.json");
const { Router } = require("express");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ orgin: /http:\/\/localhost/ }));
app.options("*", cors());
const apiRout = "/api";

const hörbücher = require("./json/hörbücher.json")

const router = express.Router();
router.get("/", (req, res) => {
  res.send(`${package.description} - v${package.version}`);
});
router.get('/books/:book', (req, res) => {
    const hörbuch = hörbücher[req.params.book];
  
    // Check if account exists
    if (!hörbuch) {
      return res.status(404).json({ error: 'Hörbuch Existiert nicht' });
    }
  
    return res.json(hörbuch);
  });
app.use(apiRout, router);
app.listen(port, () => {
  console.log("Express server listening");
});
