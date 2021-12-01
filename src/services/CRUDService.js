import bcrypt from 'bcryptjs';
import db from '../models/index'

const salt = bcrypt.genSaltSync(10);

//create user
let createNewUser = async (data) =>{
    return new Promise(async(resolve,reject) =>{
        try {
            //let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password:data.password,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender === '1' ? true :false,
                roleId: data.roleId,
            });

            resolve('ok! create a new user success')
        } catch (e) {
            reject(e)
        }
    })

}
//hash pwd
//false hash password
let hashUserPassword = (password) =>{
    return new Promise(async (resolve, reject) =>{
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
            
        } catch (e) {
            reject(e);
        }
    })
}

//get all user information
let getAllUser=()=>{
    return new Promise(async(resolve,reject)=>{
        try {
          let users = db.User.findAll({
              raw: true
          }) ;
          resolve(users)
        } catch (e) {
            reject(e);
            
        }
    })
}
//get 1 user information by id
let getUserInforById =(userId) =>{
    return new Promise(async(resolve,reject)=>{
        try {
          let user = db.User.findOne({
            where:{id:userId}  ,
            raw: true
          }) ;
          if(user){
            resolve(user)

          }
          else{
              resolve({})
          }
        } catch (e) {
            reject(e);
            
        }
    })
}

//update user information with user's id
let updateUserData =(data)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let user = await db.User.findOne({
                where:{id:data.id}
            })
            if(user){
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                await user.save();
                let allUsers = await db.User.findAll()
                resolve(allUsers);
            }
            else{
                resolve();
            }
            
        } catch (e) {
            reject(e);
            
        }
    })
}

//delete 1 user
let deleteUserById=(userId)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let user = await db.User.findOne({
                where:{id:userId}
            })

            if(user){
                user.destroy();
            }

            resolve();
        } catch (e) {
            reject(e);
        }
    })
}
module.exports ={
    createNewUser: createNewUser,
    getAllUser:getAllUser,
    getUserInforById:getUserInforById,
    updateUserData:updateUserData,
    deleteUserById:deleteUserById
}    