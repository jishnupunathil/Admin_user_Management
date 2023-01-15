var db = require('../config/connection')
var bcrypt=require('bcrypt')
const { USER_COLLECTION } = require('../config/collections')

module.exports={
    doSignup: (userData) => {
        return new Promise(async (resolve, reject) => {
            userData.password = await bcrypt.hash(userData.password, 10)
            console.log(userData)
            db.get().collection(USER_COLLECTION).insertOne(userData).then((data)=>{
                resolve(data)
            })
        }).catch((error)=>{
            reject(error)
        })
    }
}