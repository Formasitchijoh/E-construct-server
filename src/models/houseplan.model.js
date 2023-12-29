const dbConn = require('../../config/db.config')


const create = (houseplan, result) =>{
    dbConn.query("INSERT INTO houseplan set ? ", houseplan, (err, res) =>{
        if(err){
            console.log("error", err);
            result(err, null)
        }else{
            console.log(res.insertId);
            result(null, res.insertId)
        }
    } )
}

const findbyId = (id, result) =>{
    dbConn.query("SELECT * FROM houseplan WHERE houseplan.plan_id=?", id, (err, res) =>{
        if(err){
            console.log("error", err);
            result(err, null)
        }result(null, res)
    })
}

const findAll = (result) =>{
    dbConn.query("SELECT * FROM houseplan" , (err, res) =>{
        if(err){
            console.log("error", err);
            result(err, null)
        }result(null, res)
    })
}

const update = (id, houseplan, result) =>{
    dbConn.query("UPDATE houseplan SET plan_id=?, description=?, price=?, details=?",
     [id, houseplan.description, houseplan.price, houseplan.details], (err, res) =>{
        if(err){
            console.log("error", err);
            result(err, null)
        }else{
            result(null, res)
        }
     })
}

const remove = (id, result) =>{
    dbConn.query("DELETE FROM houseplan WHERE plan_id=?",
     [id], (err, res) =>{
        if(err){
            console.log("error", err);
            result(err, null)
        }else{
            result(null, res)
        }
     })
}
module.exports = {create, findAll, findbyId, update, remove}