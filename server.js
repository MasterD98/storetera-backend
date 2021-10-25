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
        tablename : "ai_datapoints"
    }
})

app.use(cors())
app.get('/',(req,res)=>{
    db.select('*').from('users').where('id',id)
    .then(user=>{
        if(user.length){
            res.json(user[0])
        }else{
            res.status(400).json("Not Found")
        }
    })
    .catch(err=>{res.status(400).json('Error getting user')})
})

app.listen(process.env.PORT || 3000,()=>{
    console.log(`${process.env.PORT}`);
})