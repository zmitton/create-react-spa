import express from 'express';
import compression from 'compression';

// if implementing HTTP requests, `npm install body-parser` and uncomment:
// import bodyParser from 'body-parser';

const app = express();

app.use(compression());
app.use(express.static('public'));

// if implementing HTTP requests, uncomment:
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// also uncomment proxy settings in webpack-helpers/base-bundles.js (for dev-server)

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});