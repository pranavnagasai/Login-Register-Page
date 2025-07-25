const express = require("express");
const connectdb = require("./mongoosedb");
const login_schema = require("./dbmodel");
const app = express();
const router = express.Router();
const encrypt = require("bcrypt");

const port = process.env.PORT || 4000 ;

app.use(express.json())
app.use(express.static('./public'));
app.use(express.static('./public/sources'));


app.post('/api/login',async (req,res)=>{
    try {
        const{password:password} = req.body;
        const {email:email, request: request1 ,name:name} = req.body;
        if(request1 == "login"){
            const update1 = await login_schema.findOne({email:email});
            if(!update1){
                return res.status(201).json({msg:`no member with that email`,success:`false`});
            }
            const compared = await encrypt.compare(password,update1.password);
            if(compared){
                res.status(201).json({success : "true"});
            }
            else{
                res.status(201).json({msg :`not correct password`,success:`false`});
            }
        }
        else{
            const hashed = await encrypt.hash(password,10);
            const update1 = await login_schema.findOne({email:email});
            if(!update1){
                const create = await login_schema.create({email:email,password:hashed,name: name});
                res.status(201).json({success:"true"});
            }
            else{
                res.status(201).json({
                    success:"false",
                    msg: "already an account exists with that email"
                })
            }
        }
    } catch (error) {
        res.status(500).json({message : error});
    }
})

const connect = async ()=>{
    try {
        await connectdb();
        app.listen(port,()=>{
        console.log(`Server running at port ${port}`)
    })
    } catch (error) {
        console.log(error);
    }
}
connect();