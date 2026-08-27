const express = require('express')
const router = express.Router();

const Student = require('../models/student')

router.post('/',async (req,res)=>{
    try{
        const data = req.body;
        console.log("Request body:", req.body);
        const newStudent = new Student(data);
        const response = await newStudent.save();

        console.log("Student data saved")
        res.status(200).json(response);
    }
    catch(err){
        console.log("Error:",err)
        res.status(500).json({error: err.message});
    }
})

router.get('/',async (req, res)=>{
    try{
        const data = await Student.find();
        console.log("All students Data fetched")
        res.status(200).json(data);
    }catch(err){
        console.log("Error: ", err);
        res.status(500).json({"Error: ": err});
    }
})

router.get('/:work', async (req, res)=>{
    try{
        const work = req.params.work;
        if (work=="Fresher" || work=="Senior" || work=="Penultimate" ||work=="Placed"){

            const response = await Student.find({"work": work});
            console.log(work, "Data fetched");
            res.status(200).json(response);
        }
        else{
            console.log("Invalid work");
            res.status(404).json({"Error":"NOT FOUND"});
        }
    }
    catch(err){
        console.log("Error: ", err);
        res.status(500).json({"Error: ":err});
    }
})

router.put('/:id', async (req, res)=>{
    try{
        const id = req.params.id;
        const update = req.body;

        const response = await Student.findByIdAndUpdate(id, update,{
            new: true,
            runValidators: true
        })

        if (!response){
            console.log("Invalid id");
            res.status(404).json({"Error":"NOT FOUND"});
        }
        else{            
            console.log("Updated record");
            res.status(200).json(response);
        }
    }
    catch(err){
        console.log("Error: ", err);
        res.status(500).json({"Error: ":err});
    }
})

router.delete('/:id', async (req, res)=>{
    try{
        const id = req.params.id;

        const response = await Student.findByIdAndDelete(id);

        if (!response){
            console.log("Invalid id");
            res.status(404).json({"Error":"NOT FOUND"});
        }
        else{            
            console.log("Deleted record");
            res.status(200).json({"message":"Deleted successfully"});
        }
    }
    catch(err){
        console.log("Error: ", err);
        res.status(500).json({"Error: ":err});
    }
})


module.exports = router;