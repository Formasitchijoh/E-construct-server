const dbConn = require('../../config/db.config')


const create = (bid, result) =>{
    dbConn.query("INSERT INTO bid set ? ", bid, (err, res) =>{
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
    dbConn.query("SELECT * FROM bid WHERE bid.bid_id=?", id, (err, res) =>{
        if(err){
            console.log("error", err);
            result(err, null)
        }result(null, res)
    })
}

const findAll = (result) =>{
    dbConn.query("SELECT * FROM bid" , (err, res) =>{
        if(err){
            console.log("error", err);
            result(err, null)
        }result(null, res)
    })
}

const update = (id, bid, result) =>{
    dbConn.query("UPDATE bid SET bid_id=? proposed_priced=?, proposed_timeline=?, bid_status=?, project_id=? ",
     [id, bid. proposed_priced, bid.proposed_timeline, bid.bid_status, bid.project_id], (err, res) =>{
        if(err){
            console.log("error", err);
            result(err, null)
        }else{
            result(null, res)
        }
     })
}

const remove = (id, result) =>{
    dbConn.query("DELETE FROM bid bid_id=?",
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