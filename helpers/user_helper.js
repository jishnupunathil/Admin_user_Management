var db = require('../config/connection')
var bcrypt=require('bcrypt')
const { USER_COLLECTION } = require('../config/collections')

module.exports={
    doSignup: (userData) => {
        return new Promise(async (resolve, reject) => {
            userData.password = await bcrypt.hash(userData.password, 10)
            // console.log(userData)
            db.get().collection(USER_COLLECTION).insertOne(userData).then((data)=>{
                resolve(data)
            })
        })
    },
    doLogin: (userData) => {
        return new Promise(async (resolve, reject) => {
            let loginStatus = false
            let response = {}
            let user = await db.get().collection(USER_COLLECTION).findOne({ email: userData.email })
            if (user) {

                bcrypt.compare(userData.password, user.password).then((status) => {

                    if (status) {
                        console.log("login");
                        response.user = user
                        response.status = true
                        resolve(response)
                    } else {
                        console.log("failed to connect");
                        resolve({ Status: false })
                    }

                })
            } else {
                console.log("no user found");
                resolve({ Status: false })
            }
        })
    },
    getUsers: () => {
        return new Promise(async (resolve, reject) => {
            let users = await db.get().collection(USER_COLLECTION).find().toArray()

            resolve(users)
        })
    },
    addUser:(userData)=>{
        return new Promise(async(resolve,reject)=>{
            userData.password=await bcrypt.hash(userData.password,10)
            db.get().collection(USER_COLLECTION).insertOne(userData).then((data)=>{
                resolve(data)
            })
        })
    }
}