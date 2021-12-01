 import db from '../models/index'
 import CRUDService from "../services/CRUDService"
let getHomePage = async (req,res) =>{
    try {
        let data = await db.User.findAll();
        console.log('-------------------')
        console.log(data)
        return res.render("homepage.ejs", {
            data: JSON.stringify(data)
        });
    } catch (e) {
       console.log(e); 
    }  
}


let getCRUD = (req,res) =>{
    return res.render("crud.ejs");
}
let postCRUD = async (req,res) =>{
    let message = await CRUDService.createNewUser(req.body)
    console.log(message);
    return res.send("post crud from server");
}

let getAboutPage=(req,res)=>{
    return res.render('about.ejs')
}

let displayCRUD = async (req,res) =>{
    let data = await CRUDService.getAllUser();
    return res.render('displayCRUD.ejs',{
        dataTable:data
    })

}

let getEditCRUD= async (req,res) =>{
    let userID = req.query.id;
    if(userID){
        let userData = await CRUDService.getUserInforById(userID);
        //check user data not found
        return res.render('editCRUD.ejs',{
            user:userData
        })
    }
    else{
        return res.send('User not found')
        
    }
}

let putCRUD = async(req,res)=>{
    //lay tat ca input bang req.body
    let data = req.body
    let allUser = await CRUDService.updateUserData(data);
    return res.redirect("/get-crud");
}
let deleteCRUD = async(req,res)=>{
    //lay id
    let id =req.query.id
    //check user exists
    if(id){
        await CRUDService.deleteUserById(id);
        return res.send('delete user success')
    }
    else{
        return res.send('user not found')
    }
    
}

module.exports = {
    getHomePage :getHomePage,
    getAboutPage : getAboutPage,
    getCRUD : getCRUD,
    postCRUD : postCRUD,
    displayCRUD : displayCRUD,
    getEditCRUD:getEditCRUD,
    putCRUD:putCRUD,
    deleteCRUD:deleteCRUD,
}