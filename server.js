require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const compression = require('compression');

const app = express();
const PORT = process.env.PORT;
const ENVIRONMENT = process.env.ENVIRONMENT;
const corsOption = {
    origin:'*',
    methods : 'GET,POST,PUT,PATCH,DELETE',
}
const limit = rateLimit({
    windowMs:1000*15,
    max:4,
    message:'Too many request.Please try after sometime'
})
//middleware
app.use(cors(corsOption));
app.use(express.json({limit:'10kb'}));
app.use(express.urlencoded({extended:false}));
app.use(compression());

if(ENVIRONMENT != 'DEVELOPMENT'){
    app.use(helmet());
    app.use(limit);
}
const twoSum = (arr,target) =>{
    
    for(let i=0;i<arr.length;i++) {
        for(let j=i+1;j<arr.length;j++){
            let sum_of_two_element = arr[i] + arr[j];
            if(sum_of_two_element == target) {
                return true;
            }
        }
    }
    return false;
}

//routes
app.get('/about-us',(req,res)=>{

    let arr = [0, -1, 2, -3, 1];
    arr.sort((a,b)=>a-b);
    console.log(arr);
    let target = -2;
    let result = twoSum(arr,target);
    // res.status(200).send({'content':'About the portal'.repeat(100000)});
    res.status(200).send({'content':'About the portal ,twoSum result:'+result});
})

app.use('/',(req,res)=>{
    res.status(200).send({message:'Welcome back to my website'});
})



app.listen(PORT,()=>{
    console.log(`server is running on port:${PORT}`);
})

