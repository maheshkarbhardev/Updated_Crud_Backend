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

    //To format a date in YYYY-MM-DD
    const formattedDate= new Date(birthDate).toISOString().split("T")[0];

    if(passwords !== confirmPasswords){
        return res.status(400).json({message:"password does not match."})
    }

    //To get multiple values from checkbox , when you select multiple checkboxes.
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

app.get("/api/get",(req,res)=>{
    const sqlGet="SELECT * FROM employee";

    db.query(sqlGet,(err,result)=>{
        if(err){
            console.log("Error:- ",err);
            res.status(400).json({error:"Fail to fetch data."})            
        }
        res.send(result);
    })
})

app.delete("/api/delete/:id",(req,res)=>{
    const {id}=req.params;
    const sqlDelete="DELETE FROM employee WHERE id=?";

    db.query(sqlDelete,id,(err,result)=>{
        if(err){
            console.log("Error:- ",err);
            res.status(400).json({error:"Fail to insert data."})            
        }
        res.status(200).json({message:"Data deleted Successfully."})
    })
})

app.put("/api/update/:id",(req,res)=>{
    const {id}=req.params;
    const {firstName, lastName, email, phoneNumber, passwords, confirmPasswords, age, gender, department, interests, birthDate}=req.body;

    const formattedDate= new Date(birthDate).toISOString().split("T")[0];

    if(passwords !== confirmPasswords){
        return res.status(400).json({message:"Passwords are not matching."})
    }

    const interetstString=Array.isArray(interests) ? interests.join(","):"";

    const sqlUpdate="UPDATE employee SET firstName=? , lastName=? , email=? ,phoneNumber=? ,passwords=? ,confirmPasswords=? ,age=? ,gender=? ,department=? ,interests=? ,birthDate=? WHERE id=?";

    db.query(sqlUpdate,[firstName, lastName, email, phoneNumber, passwords, confirmPasswords, age, gender, department, interetstString, formattedDate,id],(err,result)=>{
        if(err){
            console.log("Error:- ",err);
            res.status(400).json({error:"Fail to update data."})            
        }

        res.status(200).json({message:"Successfully data updated."})
    })
})

app.get("/api/get/:id",(req,res)=>{
    const {id}=req.params;
    const sqlGet="SELECT * FROM employee WHERE id=?";

    db.query(sqlGet,id,(err,result)=>{
        if(err){
            console.log("Error:- ",err);
            res.status(400).json({error:"Fail to fetch data."})            
        }
        res.send(result);
    })
})

app.listen(5000, () => {
  console.log("Backend Server Started At Port: 5000");
});
