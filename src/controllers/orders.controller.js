const {create, remove, update, findAll, findbyId } = require('../models/orders.model')

const getAllOrders = (req, res) =>{
    findAll((err, Orders) =>{
        if(err){
            console.log("error", err);
            res.send(err);
        }else{
            console.log('Orders:', Orders);
            res.send(Orders)
        }
    })
}

const getOrdersById = (req, res) =>{
    findbyId(req.params.id, (err, Orders) =>{
        if(err) res.send(err)
        res.json(Orders)
    })
}

const createOrders =(req, res) =>{
    if(!req.body){
        res.status(401).json({message: "data required"})
    }else{
        create(req.body, (err, Orders) =>{
            if(err) res.send(err)
            res.json({error:false, message:"Orders added successfully\n", data:Orders})

        })
    }

} 


const updateOrders = (req, res) =>{ 
    if(!req.body && !req.params.id){
        res.json({message:"Please provide all the required fields"})
    }else{
       update(req.params.id, req.body, (err, Orders) =>{
        if(err) res.send(err)
        res.json({error:false, message:"Orders added successfully", data:Orders})
       })
    }
}

const deleteOrders = (req, res) =>{
    if(!req.params.id) res.status(401).json({message:"provide the id of the Orders to be deleted"})
    remove(req.params.id, (err, Orders) =>{

        if(err) res.send(err)
        res.json({error:false, message:"Orders deleted successfully"})

    })
}

module.exports = { getAllOrders, createOrders, deleteOrders, updateOrders, getOrdersById}