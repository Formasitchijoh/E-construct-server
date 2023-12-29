const dbConn = require('../../config/db.config')


const create = (orders, result) =>{
    dbConn.query("INSERT INTO orders set ? ", orders, (err, res) =>{
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
    dbConn.query("SELECT * FROM orders WHERE orders.order_id=?", id, (err, res) =>{
        if(err){
            console.log("error", err);
            result(err, null)
        }result(null, res)
    })
}

const findAll = (result) =>{
    dbConn.query("SELECT * FROM orders" , (err, res) =>{
        if(err){
            console.log("error", err);
            result(err, null)
        }result(null, res)
    })
}

const update = (id, orders, result) =>{
    dbConn.query("UPDATE orders SET order_id=?, quantity=?, total_price=?, order_status=?, user_id=?, material_id=? ",
     [id, orders.quantity, orders.total_price, orders.order_status, orders.user_id, orders.material_id], (err, res) =>{
        if(err){
            console.log("error", err);
            result(err, null)
        }else{
            result(null, res)
        }
     })
}

const remove = (id, result) =>{
    dbConn.query("DELETE FROM orders WHERE order_id=?",
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