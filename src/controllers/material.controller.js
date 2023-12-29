'use strict'

const Material = require('../models/material.model')

exports.findAll = (req, res) => {
    Material.findAll( (err, materials) =>{
        if(err){
            console.log('error:',err);
            res.send(err);
        }else{
            console.log('material:', materials);
            res.send(materials)
        }
    })
}

exports.findById = (req, res) =>{
    Material.findById(req.params.id, (err, material) => {
        if(err) res.send(err)
        res.json(material)
    })
}

exports.createMaterial = (req, res) =>{
    const new_material = new Material(req.body)
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.json(400,{message:"Please provide all the required fields"})
    }else{
        Material.create(new_material, (err, material) =>{
            if(err) {
                res.send(err)
            }
            else{
        res.json({error:false, message:"Material added successfully", data:material})}
        })
        
    }
}

exports.updateMaterial = (req, res) =>{
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.json({message:"Please provide all the required fields"})
    }else{
        Material.update(req.params.id, new Material(req.body), (err, material) =>{
            if(err) {
                res.send(err)
            }else{
                res.json({error:false, message:"material updated successfully", data:material})
            }
        })
    }
}

exports.deleteMaterial = (req, res) =>{
    Material.delete(req.params.id, (err, material) =>{
        if(err){
            res.send(err)
        }else{
            res.json({error:false, message:"material deleted successfully"})
        }
    })
}

exports.materialCostForProject = (req, res) =>{
    Material.materialCost(req.params.id, (err, material) =>{
        if(err){
            res.send(err)
        }else{
            res.send(material)
        }
    })
}