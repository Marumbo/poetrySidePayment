const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const messageRouter = require('./routes/messageRoutes')
const purchaseRouter = require('./routes/purchaseRoutes')

require('dotenv').config();

const app = express();

const stripe = require("stripe")(process.env.secret_key);


app.use(express.json());


app.use(cors({
    origin: '*',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));


mongoose.connect(process.env.dbURI)
.then((result)=>{
    console.log('connected to db!')
    
})
.catch((err)=> console.log(err));

console.log('Started server on port 4242!')
    app.listen(process.env.PORT || 4242);

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

app.post('/create-payment-intent-poetry', async (req,res) =>{

    console.log("create payment intent")
    
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount:500,
            currency:'usd',
            automatic_payment_methods: {
                enabled: true,
              },
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


app.use('/messages', messageRouter)
app.use('/purchase', purchaseRouter)