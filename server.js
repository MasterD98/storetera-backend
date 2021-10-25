const express = require('express');
const app=express();
const cors=require('cors');
const knex=require('knex');

const db=knex({
    client: 'mysql',
    connection: {
        host : '35.184.42.199',
        port : 3306,
        user : 'remote2',
        password : 'senura123',
        database : 'str108221',
    }
})

app.use(cors())
app.get('/',(req,res)=>{
    db.select('*').from('ai_datapoints').then(data=>{
        const datas=[]
        let i=0
        if(data.length){
            for (let index = data.length-1; index > data.length-6; index--) {
                datas[i++]=data[index]
            }
            res.status(400).json(datas)
        }else{
            res.status(400).json("Not Found")
        }
    })
    .catch(err=>{res.status(400).json('Error getting user')})
})

app.listen(process.env.PORT || 3000,()=>{
    console.log(`${process.env.PORT}`);
})