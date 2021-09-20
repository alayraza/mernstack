const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
const User = require('./userSchema')
const router = express.Router()

dotenv.config({path:'./config.env'})
const db=process.env.DATABASE;
const port=process.env.PORT

mongoose.connect(db).then(()=>{
    console.log('connection successfull')
}).catch((err)=> console.log('no connection'))


// router.get('/',(req, res)=>{
//     res.send('Hello world from server')
// })
app.use(express.json())
app.use(
    router.get('/',(req, res)=>{
        res.send('Hello world from server use')
    }),
    router.post('/register',(req,res)=>{
        const {name,email,phone,password,cpassword}=req.body
        if(!name || !email ||!phone ||!password ||!cpassword){
            return res.status(422).json({error:"All Fields is required"})
        }
        User.findOne({email:email}).then((userExist)=>{
            if(userExist){
                return res.status(422).json({error:"Email already Exist"});
            }
            const user = new User({name,email,phone,password,cpassword});
            user.save().then(()=>{
                return res.status(201).json({message:"user registered"})
            }).catch((err)=>res.status(500).json({error:"failed to register"}))
        }).catch(err=>{console.log(err)})
        // res.json({message:req.body})
        // console.log({message:req.body})
    })
)
// app.post('/register',(req,res)=>{
//     res.json({message:req.body})
// })
// app.get('/',(req,res)=>{
//     res.send('Hello world from about server')
// })
app.get('/about',(req,res)=>{
    res.send('Hello world from about server')
})
app.listen(process.env.PORT || 3000,()=>{
    console.log('Server is running')
})