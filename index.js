const express = require("express");
const app = express();
const cors=require('cors');
const bodyParser=require('body-parser');
const db=require('./database');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.post("/api/post",(req,res)=>{
    const {firstName, lastName, email, phoneNumber, passwords, confirmPasswords, age, gender, department, interests, birthDate}=req.body;

    //To format a date in DD-MM-YYYY
    const formattedDate= new Date(birthDate).toISOString().split("T")[0];

    if(passwords !== confirmPasswords){
        return res.status(400).json({message:"password does not match."})
    }

    const interestsString=interests.join(",");
    
    const sqlInsert="INSERT INTO employee (firstName, lastName, email, phoneNumber, passwords, confirmPasswords, age, gender, department, interests, birthDate) VALUES (?,?,?,?,?,?,?,?,?,?,?)";

    db.query(sqlInsert,[firstName, lastName, email, phoneNumber, passwords, confirmPasswords, age, gender, department, interestsString, formattedDate],(err,result)=>{
        if(err){
            console.log("Error:- ",err);
            res.status(400).json({error:"Fail to insert data."})            
        }
        res.status(200).json({message:"Data Inserted Successfully."})
    })
})

app.listen(5000, () => {
  console.log("Backend Server Started At Port: 5000");
});
