const {create, remove, update, findAll, findbyId } = require('../models/projects.model')

const getAllProjects = (req, res) =>{
    findAll((err, projects) =>{
        if(err){
            console.log("error", err);
            res.send(err);
        }else{
            console.log('projects:', projects);
            res.send(projects)
        }
    })
}

const getProjecById = (req, res) =>{
    findbyId(req.params.id, (err, project) =>{
        if(err) res.send(err)
        res.json(project)
    })
}

const createProject =(req, res) =>{
    if(!req.body){
        res.status(401).json({message: "data required"})
    }else{
        create(req.body, (err, project) =>{
            if(err) res.send(err)
            res.json({error:false, message:"Project added successfully\n", data:project})

        })
    }

} 


const updateProject = (req, res) =>{ 
    if(!req.body && !req.params.id){
        res.json({message:"Please provide all the required fields"})
    }else{
       update(req.params.id, req.body, (err, project) =>{
        if(err) res.send(err)
        res.json({error:false, message:"Project added successfully", data:project})
       })
    }
}

const deleteProject = (req, res) =>{
    if(!req.params.id) res.status(401).json({message:"provide the id of the roject to be deleted"})
    remove(req.params.id, (err, project) =>{

        if(err) res.send(err)
        res.json({error:false, message:"product deleted successfully"})

    })
}

module.exports = { getAllProjects, createProject, deleteProject, updateProject, getProjecById}