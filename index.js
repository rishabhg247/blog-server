const express = require("express");
const app = express();
const port=8080;
const router = require('./routes/posts.js');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(port, () => {console.log("Connected to port 8080")});
