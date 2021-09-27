const express = require('express');
const app=express();
const cors=require('cors');

const storeterra = {
    cards: [{
        name:"Output Load",
        value: 0.00
    }
    ,{
        name:"Total Energy",
        value: 0.00
    }
    ,{
        name:"Battery Voltage",
        value: 0.00
    }
    ,{
        name:"BUS Voltage",
        value: 0.00
    }],
    diagram: [{
            name:"Generation",
            direction: "no",
            value: 0.00
        }
        ,{
            name:"Grid",
            direction: "no",
            value: 0.00
        }
        ,{
            name:"Battery",
            direction: "no",
            value: 0.00
        }
        ,{
            name:"Home",
            direction: "no",
            value: 0.00
        }
    ]
}
const arrowStates=["no","in","out"]

const ChangeVariables=()=>{
    storeterra.cards[0].value=Math.floor((Math.random() * 10) + 10);
    storeterra.cards[1].value=Math.floor((Math.random() * 100) + 8000);;
    storeterra.cards[2].value=Math.floor((Math.random() * 10) + 225);
    storeterra.cards[3].value=Math.floor((Math.random() * 10) + 400);
    storeterra.diagram.forEach((source)=>{
        source.value=Math.floor((Math.random() * 6));
        (source.value==0) ? source.direction = arrowStates[0] : source.direction= arrowStates[Math.floor((Math.random() * 2)+1)];
    })
    // storeterra.diagram[0].direction=arrowStates[Math.floor((Math.random() * 2)+1)];
    // storeterra.diagram[1].direction="out"
    // storeterra.diagram[2].direction="out"
    // storeterra.diagram[3].direction="out"
}

app.use(cors())
app.get('/',(req,res)=>{
    ChangeVariables();
    console.log(storeterra)
    res.json(storeterra);
})

app.listen(process.env.PORT || 3000,()=>{
    console.log(`${process.env.PORT}`);
})