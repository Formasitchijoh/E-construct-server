'use strict'

var dbConn = require('../../config/db.config')

let Material = function(material) {

    this.name = material.name;
    this.description = material.description;
    this.price = material.price;
    this.quantity = material.quantity;
    this.supplier_id = material.supplier_id;
    this.supplier_info = material.supplier_info;
    this.project_id = material.project_id;
    this.category_id = material.category_id;
}

Material.create  = (material, result) =>{
    dbConn.query("INSERT INTO material set ? ", material, (err, res) =>{
        if(err){
            console.log("error:", err);
            result(err, null)
        }else{
            console.log(res.insertId);
            result(null, res.insertId)
        }
    })
}


Material.findById = (id, result) =>{
    dbConn.query("select * from  material where material_id = ?", id, (err, res) =>{
        if(err){
            console.log("error:", err);
            result(err, null)
        }else{
            result(null, res)
        }
    })
}

Material.findAll = (result) =>{
    dbConn.query("select * from material", (err, res) =>{
        if(err){
            console.log('error:', err);
            result(err, null)
        }else{
            result(null, res)
        }
    })

}

Material.update = (id, material, result) =>{
    dbConn.query("UPDATE material SET name=?, description=?, price=?,quantity=?,supplier_id=?,supplier_info=?, project_id=?,category_id=?",
    [material.name, material.description, material.price, material.quantity, material.supplier_id, material.supplier_info, material.project_id, material.category_id, id],

    function(err, res){
        if(err)
       {
        console.log("error:", err);
        result(err, null)
       }else{
        result(null, res)
       }
    }
    )
}

Material.delete = (id, result) =>{
    dbConn.query("DELETE FROM material WHERE material_id=?",[id],
    (err, res) =>{
        if(err) {
            console.log("error:", err);
            result(err, null)
        }else{

            result(null, res)
        }
    }
    
    )
}

Material.materialCost = (id, result) =>{
    dbConn.query("SELECT SUM(material.price) AS total_cost FROM material WHERE material.project_id=?", id, (err, res) =>{
        if(err) result(err, null)
        result(null, res)
    })
}

module.exports = Material