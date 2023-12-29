const dbConn = require('../../config/db.config')


const create = (user, result) =>{
    dbConn.query("INSERT INTO user set ? ", user, (err, res) =>{
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
    dbConn.query("SELECT * FROM user WHERE user.user_id=?", id, (err, res) =>{
        if(err){
            console.log("error", err);
            result(err, null)
        }result(null, res)
    })
}

const findAll = (result) =>{
    dbConn.query("SELECT * FROM user" , (err, res) =>{
        if(err){
            console.log("error", err);
            result(err, null)
        }result(null, res)
    })
}

const update = (id, user, result) =>{
    dbConn.query("UPDATE user SET user_id=? name=?, email=?, location_id=?, user_type=? ",
     [id, user.name, user.email, user.location_id, user.type], (err, res) =>{
        if(err){
            console.log("error", err);
            result(err, null)
        }else{
            result(null, res)
        }
     })
}

const remove = (id, result) =>{
    dbConn.query("DELETE FROM user user_id=?",
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