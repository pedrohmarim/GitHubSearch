const express = require('express');
const app = express();
const routesUrls = require('./src/routes');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config()

app.use(express.json());
app.use(cors());
app.use(routesUrls);
app.listen(process.env.PORT || 4000)