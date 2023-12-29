const dbConn = require('../../config/db.config')


const create = (payment, result) =>{
    dbConn.query("INSERT INTO payment set ? ", payment, (err, res) =>{
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
    dbConn.query("SELECT * FROM payment WHERE payment.payment_id=?", id, (err, res) =>{
        if(err){
            console.log("error", err);
            result(err, null)
        }result(null, res)
    })
}

const findAll = (result) =>{
    dbConn.query("SELECT * FROM payment" , (err, res) =>{
        if(err){
            console.log("error", err);
            result(err, null)
        }result(null, res)
    })
}

const update = (id, payment, result) =>{
    dbConn.query("UPDATE payment SET payment_id=?, payment_method=?, transaction_details=?, payment_status=?, user_id=?, order_id=?, project_id=? ",
     [id, payment.payment_method, payment.transaction_details, payment.payment_status, payment.user_id, payment.order_id, payment.project_id], (err, res) =>{
        if(err){
            console.log("error", err);
            result(err, null)
        }else{
            result(null, res)
        }
     })
}

const remove = (id, result) =>{
    dbConn.query("DELETE FROM payment WHERE payment_id=?",
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