const {create, remove, update, findAll, findbyId } = require('../models/payment.model')

const getAllPayment = (req, res) =>{
    findAll((err,payment) =>{
        if(err){
            console.log("error", err);
            res.send(err);
        }else{
            console.log('Payment:',payment);
            res.send(payment)
        }
    })
}

const getPaymentById = (req, res) =>{
    findbyId(req.params.id, (err,payment) =>{
        if(err) res.send(err)
        res.json(payment)
    })
}

const createPayment =(req, res) =>{
    if(!req.body){
        res.status(401).json({message: "data required"})
    }else{
        create(req.body, (err,payment) =>{
            if(err) res.send(err)
            res.json({error:false, message:"Payment added successfully\n", data:payment})

        })
    }

} 


const updatePayment = (req, res) =>{ 
    if(!req.body && !req.params.id){
        res.json({message:"Pleaseprovide all the required fields"})
    }else{
       update(req.params.id, req.body, (err, payment) =>{
        if(err) res.send(err)
        res.json({error:false, message:"Payment added successfully", data:payment})
       })
    }
}

const deletePayment = (req, res) =>{
    if(!req.params.id) res.status(401).json({message:"provide the id of thepayment to be deleted"})
    remove(req.params.id, (err,payment) =>{

        if(err) res.send(err)
        res.json({error:false, message:"Payment deleted successfully"})

    })
}

module.exports = { getAllPayment, createPayment, deletePayment, updatePayment, getPaymentById}