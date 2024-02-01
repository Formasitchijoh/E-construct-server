const dbConn = require('../../config/db.config')



const materials = (supplierId) =>{
    return new Promise((resolve, reject) =>{
        dbConn.query("SELECT * FROM material WHERE supplier_id =?", supplierId, (err, res) =>{
            if(err) {
                console.log(`Server error:`, err);
                reject(err)
            }else{
                resolve(res)
            }
        })
    })
}  
const material = (materialId, supplierId) =>{
    return new Promise((resolve, reject) =>{
        dbConn.query("SELECT * FROM material WHERE material_id = ? AND supplier_id = ?", [materialId, supplierId], (err, res)=>{
            if(err) {
                console.log(`Server error:`, err);
                reject(err)
            }else{
                resolve(res)
            }
        })
    })
}

const update = ( material) =>{
    return new Promise((resolve, reject) =>{
        dbConn.query("UPDATE material SET name =?, description =?, price =?, quantity =?, supplier_id =?, supplier_info =?, project_id =?, category_id =? WHERE material_id =?",
        [material.name, material.description, material.price, material.quantity, material.supplier_id, material.supplier_info, material.project_id, material.category_id, material.material_id],
       (err, res)=>{
            if(err) {
                console.log(`Server error:`, err);
                reject(err)
            }else{
                resolve(res)
            }
        }
        )
    })
}

const create = (material) => {
    return new Promise((resolve, reject) =>{
        dbConn.query("INSERT INTO material SET ?", material, (err, res)=>{
            if(err){
                console.log(`Server error:`, err);
                reject(err)
            }else{
                resolve(res)
            }
        })
    })
}

const deleteMaterial = (materialId, supplierId) =>{
    return new Promise((resolve, reject) =>{
        dbConn.query("DELETE FROM material WHERE material_id = ? , supplier_id = ? ", [materialId, supplierId], (err, res) =>{
            if(err){
                console.log(`Server error:`, err);
                reject(err)
            }else{
                resolve(re)
            }
        })
    })
} 

module.exports = { create, update, materials, material, deleteMaterial}