let mongoose=require('mongoose');

const Schema=mongoose.Schema;

const mongooseSchema=new Schema({
    id:{
        type:Number,
       default:0,
       unique:true
    },
    task:{
        type:String,
        required:true
    },
    isCompleted:{
           type:Boolean,
           required:true,
           default:false
    }
});



let mongoosedata=mongoose.model('tododata',mongooseSchema);

module.exports=mongoosedata;



