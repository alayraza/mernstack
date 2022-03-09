const mongoose = require('mongoose')
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