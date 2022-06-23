const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

const stripe = require("stripe")(process.env.secrect_key);

app.use(express.json());


mongoose.connect(process.env.dbURI)
.then((result)=>{
    console.log('connected to db!')
    console.log('Started server on port 4242!')
    app.listen(4242);
})
.catch((err)=> console.log(err));

app.use(express.urlencoded({extended:true}))

app.get('/', (req, res) => {
  
    console.log("Maru stripe payment api Home")
    res.send("Welcome to Man maru stripe api")
});

app.get('/public-key',(req,res)=>{

    console.log("request for public key")
    res.send({
        'public-key':process.env.public_key
    })

})

app.post('/create-payment-intent-poetry', async(req,res)=>{

    console.log("create payment intent")
    
    try {
        const paymentIntent = await stripe.paymentIntent.create({
            amount:500,
            currency:'usd',
        })

        res.json({
            status:'success',
            message:'payment intent created',
            clientSecret:paymentIntent.client_secret});
        
    } catch (error) {
        console.log("Error from payment intent create")
        console.log(error.message)

        res.json({
            status:'fail',
            message:'payment intent failure',
            error: error.message
        })
    }


})