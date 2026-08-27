const express = require('express')
require('dotenv').config();
const port = process.env.PORT || 3000;

const app = express();

const db = require('./db');

const studentRouter = require('./routes/studentRoutes')

const bodyparser = require('body-parser')
app.use(bodyparser.json());

app.get('/',(req, res)=>{
    res.send("Hi! Caught you.")
})

// app.post('/hostel',async (req,res)=>{
//     // const data = req.body;
//     // const newStudent = new Student(data);
//     // // newStudent.name = data.name

//     // newStudent.save((error, savedStudent)=>{
//     //     if (error){
//     //         console.log("Error");
//     //         res.status(500).json({"Error":error.message})
//     //     }
//     //     else{
//     //         console.log("Saved student details")
//     //         res.status(200).json(savedStudent);
//     //     }
//     // })

//     try{
//         const data = req.body;
//         console.log("Request body:", req.body);
//         const newStudent = new Student(data);
//         const response = await newStudent.save();

//         console.log("Student data saved")
//         res.status(200).json(response);
//     }
//     catch(err){
//         console.log("Error:",err)
//         res.status(500).json({error: err.message});
//     }
// })

// // endpoint may be same but method is different
// app.get('/hostel',async (req, res)=>{
//     try{
//         const data = await Student.find();
//         console.log("Data fetched")
//         res.status(200).json(data);
//     }catch(err){
//         console.log("Error: ", err);
//         res.status(500).json({"Error: ": err});
//     }
// })

// app.get('/hostel/:work', async (req, res)=>{
//     try{
//         const work = req.params.work;
//         if (work=="Fresher" || work=="Senior" || work=="Penultimate" ||work=="Placed"){

//             const response = await Student.find({work: work});
//             console.log("Data fetched");
//             res.status(200).json(response);
//         }
//         else{
//             console.log("Invalid work");
//             res.status(404).json({"Error":"NOT FOUND"});
//         }
//     }
//     catch(err){
//         console.log("Error: ", err);
//         res.status(500).json({"Error: ":err});
//     }
// })

app.use('/hostel', studentRouter);
app.listen(port,()=>{
    console.log("Server listening at port ", port);
})