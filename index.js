// index.js

const express = require('express');
const dotenv = require('dotenv');
const routes = require('./routes/csv.routes');

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;


app.use(routes);


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
