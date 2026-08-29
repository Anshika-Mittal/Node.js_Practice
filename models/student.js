const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

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
    },
    username:{
        type:String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true
    }
});

studentSchema.pre('save', async function (){
    const student = this;
    if (!(student.isModified('password'))) return;
    try{
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(student.password, salt)
        student.password = hashedPassword
    }
    catch(err){
        return next(err)
    }
})

studentSchema.methods.comparePassword = async function(pwd){
    try{
        console.log(pwd);
        console.log(this.password)
        const match = await bcrypt.compare(pwd, this.password)
        return match
    }
    catch(err){
        throw err
    }
}

const Student = mongoose.model('Student',studentSchema);
module.exports = Student; 