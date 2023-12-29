'use strict'
var dbConn = require('../../config/db.config')

const create = (project, result) =>{ 
    dbConn.query("INSERT INTO project set ? ", project, ( err, res) =>{
        if(err){
            console.log("error", err);
            result(err, null)
        }else{
            console.log(res.insertId);
            result(null, res.insertId)
        }
    })
} 

const findbyId = ( id , result) =>{
    dbConn.query("SELECT * FROM project WHERE project.project_id = ?", id, (err, res) =>{
        if(err) {
            console.log("error", err);
            result(err, null)
        }
        result(null, res)
    })
}

const findAll = (result) =>{
    dbConn.query("SELECT * FROM project", (err, res) =>{
        if(err){
            console.log("error",err);
            result(err, null)
        }else{
            result(null, res)
        }
    })
}


const update = (id,project, result,) =>{
    dbConn.query("UPDATE project SET project_id=?, description=?, budget=?, timeline=?, project_status=?, homeOwner_id=?, plan_id=?", 
    [id, project.description, project.budget, project.timeline, project.project_status, project.homeOwner_id, project.plan_id ], (err, res) =>{
        if(err){
            console.log("error", err);
            result(err, null)
        }else{
            result(null, res)
        }

    })
}

const remove  = (id, result) =>{
    dbConn.query("DELETE FROM project WHERE project_id=?", id, (err, res) =>{
        if(err){
            console.log("error", err);
            result(err, null)
        }else{
            result(null, res)
        }
    })
} 


module.exports = { create, remove, update, findAll, findbyId}