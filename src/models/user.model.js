const dbConn = require('../../config/db.config')


const createAllUser = (user) =>{ 
    return new Promise((resolve, reject)=>{

        dbConn.query("INSERT INTO user set ? ", user, (err, res) =>{
            if(err){
                console.log("error", err);
                reject(err)
            }else{
               resolve(res)
               console.log(`value of user`, res);

            }
        } )
    })
}

const createUser = (user, userType) =>{
   return new Promise((resolve, reject) =>{
    dbConn.query(`INSERT INTO ${userType} set ?`, user, (err, res)=>{
        if(err){
            console.log('error', err);
           reject(err)
        }else{
            resolve(res)
            console.log(`value of user`, res);
        }
    })
   })
}

const findUserbyId = (id, result) =>{
    dbConn.query("SELECT * FROM user WHERE user.user_id=?", id, (err, res) =>{
        if(err){
            console.log("error", err);
            result(err, null)
        }result(null, res)
    })
}

const findUserByEmail =(email, userType) =>{
   return new Promise((resolve, reject)=>{
    console.log(`finding userby email`, email);
    dbConn.query(`SELECT * FROM ${userType} WHERE ${userType}.email=?`, email, (err, res)=>{
        if(err){
            console.log(`server error`, err);
           reject(err)
        }
        console.log(`result\n`, res);
       resolve(res)
    })
   })
}


const findAllUsers = (result) =>{
    dbConn.query("SELECT * FROM technician" , (err, res) =>{
        if(err){
            console.log("error", err);
            result(err, null)
        }result(null, res)
    })
}

const updateUserById = (id, user, result) =>{
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


const updateUserToken = ( email, refreshToken) =>{
    return new Promise((resolve, reject) =>{
        dbConn.query( `UPDATE user SET refreshToken = ? WHERE email = ?`, [refreshToken, email], (err, res) =>{
            if(err){
                console.log("error", err);
                reject(err)
            }else{
                resolve(res)
            }
        })
    })
}

const removeUserById = (id, result) =>{
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
module.exports = {createAllUser,updateUserToken, createUser, findUserByEmail, findAllUsers, findUserbyId, updateUserById,removeUserById}