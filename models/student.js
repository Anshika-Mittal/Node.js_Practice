const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    age:{
        type: Number
    },
    work:{
        type: String,
        enum: ['Fresher', 'Senior', 'Penultimate', 'Placed'],
        required: true
    },
    mobile:{
        type: Number
    },
    email:{
        type: String,
        unique: true
    }
});

const Student = mongoose.model('Student',studentSchema);
module.exports = Student; 