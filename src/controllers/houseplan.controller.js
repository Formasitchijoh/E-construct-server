const {create, remove, update, findAll, findbyId } = require('../models/houseplan.model')

const getAllHouseplan = (req, res) =>{
    findAll((err, houseplan) =>{
        if(err){
            console.log("error", err);
            res.send(err);
        }else{
            console.log('Houseplan:', houseplan);
            res.send(houseplan)
        }
    })
}

const getHouseplanById = (req, res) =>{
    findbyId(req.params.id, (err, houseplan) =>{
        if(err) res.send(err)
        res.json(houseplan)
    })
}

const createHouseplan =(req, res) =>{
    if(!req.body){
        res.status(401).json({message: "data required"})
    }else{
        create(req.body, (err,houseplan) =>{
            if(err) res.send(err)
            res.json({error:false, message:"Houseplan added successfully\n", data:houseplan})

        })
    }

} 


const updateHouseplan = (req, res) =>{ 
    if(!req.body && !req.params.id){
        res.json({message:"Please provide all the required fields"})
    }else{
       update(req.params.id, req.body, (err, houseplan) =>{
        if(err) res.send(err)
        res.json({error:false, message:"Houseplan added successfully", data:houseplan})
       })
    }
}

const deleteHouseplan = (req, res) =>{
    if(!req.params.id) res.status(401).json({message:"provide the id of the Houseplan to be deleted"})
    remove(req.params.id, (err, houseplan) =>{

        if(err) res.send(err)
        res.json({error:false, message:"Houseplan deleted successfully"})

    })
}

module.exports = { getAllHouseplan, createHouseplan, deleteHouseplan, updateHouseplan, getHouseplanById}