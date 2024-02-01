const {create, update, deleteMaterial,materials, material } = require("../models/supplierDashboard.model") 


const getAllMaterials = async(req, res) =>{
 
const supplierId = req.params.supplierId
    await materials(supplierId).then((material)=>{
        console.log(`values of the material\n`, material);
        res.status(200).json({message:"Data fetched successfully", data: material})
    })

} 

const  createMaterial = async(req, res) =>{
    
    const { name, description, price, quantity, supplier_id, supplier_info, project_id, category_id } = req.body 
    const material = {
        name, description, price, quantity, supplier_id:req.params.supplierId, supplier_info, project_id, category_id
    }

await create(material).then((material)=>{
       console.log(`material\n`, material);
       res.status(200).json({message:"Material saved successfully", data:material})
})

}

const updateMaterial = async(req, res) =>{
const { name, description, price, quantity, supplier_id, supplier_info, project_id, category_id, material_id} = req.body
    console.log(`bbbbbbbbbbbbbbbbbb\n`, quantity);
    const material = {
        name, description, price, quantity, supplier_id, supplier_info, project_id, category_id, material_id  
    }
    console.log(`values of the material parsed`, material);

    const updated = await update(material )
    console.log(`values of the material selected`, updated);
    res.sendStatus(200)
}


module.exports = { getAllMaterials, createMaterial, updateMaterial}