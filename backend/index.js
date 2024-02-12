let express=require('express');
let mongoose=require('mongoose');
let mongoosedata=require('./mongoosedata');
let autoIncrement=require('mongoose-auto-increment');
let cors=require('cors');
let app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
mongoose.connect('mongodb://localhost:27017/todolist');


const countermodel=mongoose.model('counter',{
    id:{
        type:String,
        default:"dataid"
    },
    seq:{
        type:Number,
        default:0
    }
});



app.get('/showdata',async(req,res)=>{
    let result=await mongoosedata.find({});
    res.send(result);
});

app.post('/insertdata',async(req,res)=>{
   let mydata=await countermodel.find({});
   if(mydata.length===0)
   {
    let myvalues=new countermodel();
    let answer=await myvalues.save();
    console.log(answer);
   }
    let task=req.body.task;
     if(task)
     {
        let myvalue=await countermodel.findOne({id:'dataid'});
        if(myvalue)
        {
       
        let mydatavalues=await countermodel.findOne({id:'dataid'});
        let dataid=mydatavalues.seq+1;
        let mysolutions=await countermodel.updateOne({id:'dataid'},{$set:{seq:dataid}});
    

        if(mysolutions)
        {
        let mydata=new mongoosedata({
            id:dataid,
            task:task
        });

        let result=await mydata.save();
        res.send('Data Inserted Successfully');
    }
    else{
        res.status(401).send('Some Technical Error');
    }
    }
    else{
        res.status(401).send('Some Error');
    }
    }
    else{
        res.status(401).send('Please Enter Tasks Carefully');
    }

});

app.put('/updatestatus/:id',async(req,res)=>{
    let id=req.params.id;
    if(id)
    {
        let mydata=await mongoosedata.findOne({id:id});
        let mystatus=!(mydata.isCompleted);
        let result=await mongoosedata.updateOne({id:id},{$set:{isCompleted:mystatus}});
        res.send(result);
    }
    else{
        res.status(401).send('Data not Written Properly');
    }
});

app.delete('/deletetask/:id',async(req,res)=>{
    let id=req.params.id;
    if(id)
    {
        
        let result=await mongoosedata.deleteOne({id:id});
        res.send(result);
    }
    else{
        res.status(401).send('Data not written successfully');
    }

})

app.listen(8800,function(){
    console.log('Port 8800 running successfully');
})