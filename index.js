const express = require("express");
const app = express();
const cors=require('cors');
const bodyParser=require('body-parser');
const db=require('./database');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.listen(5000, () => {
  console.log("Backend Server Started At Port: 5000");
});
