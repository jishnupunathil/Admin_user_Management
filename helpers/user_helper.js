var db = require('../config/connection')
var bcrypt=require('bcrypt')
const { USER_COLLECTION } = require('../config/collections')
var objectId=require('mongodb').ObjectId

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
    },
    userDetails: (userId) => {

        return new Promise(async (resolve, reject) => {
            await db.get().collection(USER_COLLECTION).findOne({ _id: objectId(userId) }).then((user) => {
                resolve(user)
            })
        })

    },
    updateProducts:(userId,userDetails)=>{
        console.log(userDetails);
        return new Promise((resolve,reject)=>{
            db.get().collection(USER_COLLECTION)
            .update({_id:objectId(userId)},{
                $set:{
                   name:userDetails.name,
                    email:userDetails.email
               }
            }).then((response)=>{
                resolve()
            })
        })

    },
    deleteProduct:(userId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(USER_COLLECTION).remove({_id:objectId(userId)}).then((response)=>{
                   console.log(response);
                resolve(response)
            })
        })
    }
}