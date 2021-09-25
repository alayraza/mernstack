const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
const User = require('./userSchema')
const router = express.Router()

const examSchema= new mongoose.Schema({
    batch:{
        type:String,
        required:true
    },
    batchId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'batchId' 
    },
    course:{
        type:String,
        required:true
    },
    courseId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'courseId' 
    },
    quizName:{
        type:String,
        required:true
    },
    quizOrder:{
        type:Number,
        required:true
    },
    examKey:{
        type:String,
        required:true
    },
    isActive:{
        type:Boolean,
        required:true
    }
})
const Exam = mongoose.model('examData',examSchema)
module.exports=Exam;

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
    }),
    router.get('/getallbatches',(req, res)=>{
        CovidBatchesExamCode.find({}).then((data)=>{
            data.map((batches)=>{
                res.send(batches.forNonCovidBatches.AIC)
            })
            console.log(data);
        })
        // res.send('getallbatches')
    }),
    router.post('/searchbybatches',(req, res)=>{
        // console.log(req);
        // const course = "AIC";
        // res.send(req.body)
        const cour=`AIC`;
        // res.send(cour)
        CovidBatchesExamCode.find({}).then((data)=>{
            data.map((batches)=>{
                res.send(batches.forNonCovidBatches.cour)
            })
            console.log(cour);
        })
        // res.send('getallbatches')
    }),
    router.post('/searchbybatches',(req, res)=>{
        const cour=`AIC`;
        CovidBatchesExamCode.find({}).then((data)=>{
            data.map((batches)=>{
                res.send(batches.forNonCovidBatches.cour)
            })
            console.log(cour);
        })
    }),
    router.post('/addnewQuiz',(req, res)=>{
        const {batch,batchId,course,courseId,quizName,quizOrder,examKey,isActive}=req.body
        if(!batch|| !batchId|| !course|| !courseId|| !quizName|| !quizOrder|| !examKey|| !isActive){
            return res.status(422).json({error:"All Fields is required"})
        }
        // Exam.findOne({batch:batch}).then((batchExist)=>{
        //     if(batchExist){
        //         return res.status(422).json({error:"Batch already Exist"});
        //     }
            const user = new Exam({batch,batchId:mongoose.Types.ObjectId(batchId),course,courseId:mongoose.Types.ObjectId(courseId),quizName,quizOrder,examKey,isActive});
            user.save().then(()=>{
                // return res.status(201).json({message:"quiz added successfully"})
                return res.status(201).json({message:user})
            }).catch((err)=>res.status(500).json({error:err}))
        // }).catch(err=>{console.log(err)})
    }),
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