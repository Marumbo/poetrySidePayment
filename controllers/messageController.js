const Message = require('../models/message');

const message_index =(req,res)=>{

    Message.find()
    .then((result)=>{

        console.log("Returning all messages")
       
        res.json({
            status:'success',
            message:'message list',
            result:result
         });

    })
    .catch((err)=>{
        console.log(err);
        res.json({
            status:'fail',
            message:' message list failure',
            error: error.message
        })
    })


}


const message_create_post = (req,res)=>{
    console.log(req.body)
    const {name, email, message,target} = req.body;
    
     const messageEntry = new Message({
         name: name,
         email:email,
        messageBody:message,
         target:target
     })
    
     messageEntry.save()
     .then((result)=>{
        console.log("saving message")
         console.log(result)
    
         res.json({
            status:'success',
            message:'message saved',
            result:result
         });
    
     })
    .catch((err)=>{
        console.log("error saving message")
        console.log(err)
        res.json({
            status:'fail',
            message:'message save failure',
            error: error.message
        })
        
    })


}

module.exports={
    message_index,
    message_create_post,
}