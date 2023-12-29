const {create, remove, update, findAll, findbyId } = require('../models/bids.model')

const getAllBid = (req, res) =>{
    findAll((err, bid) =>{
        if(err){
            console.log("error", err);
            res.send(err);
        }else{
            console.log('Bid:', bid);
            res.send(bid)
        }
    })
}

const getBidById = (req, res) =>{
    findbyId(req.params.id, (err, bid) =>{
        if(err) res.send(err)
        res.json(bid)
    })
}

const createBid =(req, res) =>{
    if(!req.body){
        res.status(401).json({message: "data required"})
    }else{
        create(req.body, (err, bid) =>{
            if(err) res.send(err)
            res.json({error:false, message:"Bid added successfully\n", data:bid})

        })
    }

} 


const updateBid = (req, res) =>{ 
    if(!req.body && !req.params.id){
        res.json({message:"Please provide all the required fields"})
    }else{
       update(req.params.id, req.body, (err, bid) =>{
        if(err) res.send(err)
        res.json({error:false, message:"Bid added successfully", data:bid})
       })
    }
}

const deleteBid = (req, res) =>{
    if(!req.params.id) res.status(401).json({message:"provide the id of the bid to be deleted"})
    remove(req.params.id, (err, Bid) =>{

        if(err) res.send(err)
        res.json({error:false, message:"bid deleted successfully"})

    })
}

module.exports = { getAllBid, createBid, deleteBid, updateBid, getBidById}