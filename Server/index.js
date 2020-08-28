const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const fetch = require("node-fetch");
require("dotenv").config();

const app = express();

// Using the middleWare
app.use(morgan("tiny"));

app.use(cors());

app.get("/videos", (req, res) => {
  let search = req.query.search;
  const url =
    "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=100&q=karaoke%20" +
    encodeURI(search) +
    "&relevanceLanguage=en&type=video&videoEmbeddable=true";

  fetch(`${url}&key=${process.env.GOOGLE_API_KEY}`)
    .then((response) => response.json())
    .then((json) => {
      res.json(json.items);
    });
});

// creating 404 (Not Found) handler and error handler
function notFound(req, res, next) {
  res.status(404);
  const error = new Error("Not Found");
  next(error);
}

function errorHandler(error, req, res, next) {
  res.status(res.statusCode || 500);
  res.json({
    message: error.message,
  });
}
//Calling the previous middle ware functions
app.use(errorHandler);
app.use(notFound);

const port = 5000;
app.listen(port, () => {
  console.log("Listening on port", port);
});
