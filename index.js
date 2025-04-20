const express = require("express");
const app = express();
const cors=require('cors');

app.listen(5000, () => {
  console.log("Backend Server Started At Port: 5000");
});
