
const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const Student = require('./models/student')
passport.use(new localStrategy(async (user, pwd, done) =>{
    try{
        console.log("Received username:", user);
        console.log("Received password:", pwd);
        const userFind = await Student.findOne({username: user});
        // console.log("Query result:", userFind);
        if (!userFind){
            console.log("Not found")
            return done(null, false, {message: "User not found."});
        }
        else{
            // without hashing
            // const matched = (userFind.password == pwd)? true:false;
            // with hashing
            const matched = await userFind.comparePassword(pwd)
            console.log("matched", matched)
            if (matched){
                console.log("Authorized")
                return done(null, userFind)
            }
            else{
                console.log("Unauthorized")
                return done(null, false, {message: 'Incorrect password'})
            }
        }
    }catch (err){
        return done(err)
    }
}))

module.exports = passport