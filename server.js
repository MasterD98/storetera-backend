const express = require('express');
const bodyParser=require('body-parser');
const app=express();
const cors=require('cors');
const knex=require('knex');
const database=''


const databases={
    B3E19380158221 :"str108221",
    B3E19380183172 :"str043172",
    B3E19380049001 :"str069001", 
    B3E19380030377 :"str070377",
    B3E19380003220 :"str053220",
    B3E19380050504 :"str030504",
    B3E19380101824 :"str081824",
    B3E19380073841 :"str023941",
    B3E19380091442 :"str011442",
    B3E19380135111 :"str095111",
}

app.use(cors())
app.use(bodyParser.json());
app.get('/ai_datapoints/:id',(req,res)=>{

    const db=knex({
        client: 'mysql',
        connection: {
            host : '35.184.42.199',
            port : 3306,
            user : 'remote2',
            password : 'senura123',
            database : databases[req.params.id],
        }
    })
    db.select('*').from('ai_datapoints').then(data=>{
        const datas=[]
        let i=0
        if(data.length){
            for (let index = data.length-1; index > data.length-6; index--) {
                datas[i++]=data[index]
            }
            res.status(200).json(datas)
        }else{
            res.status(200).json("Not Found")
        }
    })
    .catch(err=>{res.status(400).json('Error getting user')})
})
app.get('/tommrrow_prediction/:id',(req,res)=>{

    const db=knex({
        client: 'mysql',
        connection: {
            host : '35.184.42.199',
            port : 3306,
            user : 'remote2',
            password : 'senura123',
            database : databases[req.params.id],
        }
    })
    db.select('*').from('tommrrow_prediction').then(data=>{
        const datas=[]
        let i=0
        if(data.length){
            for (let index = data.length-1; index > data.length-6; index--) {
                datas[i++]=data[index]
            }
            res.status(200).json(datas)
        }else{
            res.status(200).json("Not Found")
        }
    })
    .catch(err=>{res.status(400).json('Error getting user')})
})

app.get('/raw_data/:id',(req,res)=>{

    const db=knex({
        client: 'mysql',
        connection: {
            host : '35.184.42.199',
            port : 3306,
            user : 'remote2',
            password : 'senura123',
            database : databases[req.params.id],
        }
    })
    db.select('*').from('raw_data').orderBy('index','decs').limit(100).then(data=>{
        const datas=[]
        let i=0
        if(data.length){
            for (let index = data.length-1; index > data.length-101; index--) {
                datas[i++]=data[index]
            }
            res.status(200).json(datas)
        }else{
            res.status(200).json("Not Found")
        }
    })
    .catch(err=>{res.status(400).json('Error getting user')})
})

app.get('/storhubs/:id',(req,res)=>{

    const db=knex({
        client: 'mysql',
        connection: {
            host : '35.184.42.199',
            port : 3306,
            user : 'remote2',
            password : 'senura123',
            database : 'storhubs',
        }
    })
    db.select('*').from(req.params.id+"_pcs").then(data=>{
        if(data.length){
            res.status(200).json(data)
        }else{
            res.status(200).json("Not Found")
        }
    })
    .catch(err=>{res.status(400).json('Error getting user')})
})
app.get('/house/:id',(req,res)=>{

    const db=knex({
        client: 'mysql',
        connection: {
            host : '35.184.42.199',
            port : 3306,
            user : 'remote2',
            password : 'senura123',
            database : databases[req.params.id],
        }
    })
    db.select('*').from("last_data").then(data=>{
        if(data.length){
            res.status(200).json(data)
        }else{
            res.status(200).json("Not Found")
        }
    })
    .catch(err=>{res.status(400).json('Error getting user')})
})

app.post('/login',(req,res)=>{
    const db=knex({
        client: 'mysql',
        connection: {
            host : '35.184.42.199',
            port : 3306,
            user : 'remote2',
            password : 'senura123',
            database : 'login',
        }
    })
    const{username,password}=req.body;
    if(!username||!password){
        return res.status(200).json({type:"Invalid"});
    }
    db.select('username','password').from('accounts').where('username','=',username)
    .then(data=>{
        if(data[0].password==password){
            res.status(200).json({type:"admin"})
        }else{
            res.status(200).json({type:"Invalid"})
        }  
    })
    .catch(err=>{res.status(400).json({type:"Invalid"})})

})
app.listen(process.env.PORT || 3000,()=>{
    console.log(`${process.env.PORT}`);
})