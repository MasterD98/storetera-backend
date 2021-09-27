const express = require('express');
const app=express();
const cors=require('cors');

const storeterra = {
    cards: [{
        outputLoad:{
            name:"Output Load",
            value: 0.00
        }
    },{
        totalEnergy:{
            name:"Total Energy",
            value: 0.00
        }
    },{
        batteryVoltage:{
            name:"Battery Voltage",
            value: 0.00
        }
    },{
        bisVoltage:{
            name:"BUS Voltage",
            value: 0.00
        }
    }],
    diagram: [{
        generation:{
            name:"Generation",
            direction: false,
            value: 0.00
        },
        grid: {
            name:"Grid",
            direction: false,
            value: 0.00
        },
        battery: {
            name:"Battery",
            direction: false,
            value: 0.00
        },
        consumption: {
            name:"Home",
            direction: false,
            value: 0.00
        }
    }]
}

const interval = setInterval(()=>{
    ChangeVariables();
  }, 3000);

const ChangeVariables=()=>{
    storeterra.cards[0].outputLoad.value=Math.floor((Math.random() * 10) + 10);
    storeterra.cards[1].totalEnergy.value=Math.floor((Math.random() * 100) + 8000);;
    storeterra.cards[2].batteryVoltage.value=Math.floor((Math.random() * 10) + 225);
    storeterra.cards[3].bisVoltage.value=Math.floor((Math.random() * 10) + 400);
    
    storeterra.diagram[0].generation.value=Math.floor((Math.random() * 6));
    if(storeterra.diagram[0].generation.value==0){
        storeterra.diagram[0].generation.direction=false;
    }else{
        storeterra.diagram[0].generation.direction=true;
    }

    storeterra.diagram[0].grid.value=Math.floor((Math.random() * 6));
    if(storeterra.diagram[0].grid.value==0){
        storeterra.diagram[0].grid.direction=false;
    }else{
        storeterra.diagram[0].grid.direction=true;
    }

    storeterra.diagram[0].battery.value=Math.floor((Math.random() * 6));
    if(storeterra.diagram[0].battery.value==0){
        storeterra.diagram[0].battery.direction=false;
    }else{
        storeterra.diagram[0].battery.direction=true;
    }

    storeterra.diagram[0].consumption.value=Math.floor((Math.random() * 6));
    if(storeterra.diagram[0].consumption.value==0){
        storeterra.diagram[0].consumption.direction=false;
    }else{
        storeterra.diagram[0].consumption.direction=true;
    }
}


app.use(cors())
app.get('/',(req,res)=>{
    res.json(storeterra);
})

app.listen(process.env.PORT || 3000,()=>{
    console.log(`${process.env.PORT}`);
})