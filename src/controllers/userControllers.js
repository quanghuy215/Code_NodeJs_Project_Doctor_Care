import { json } from "body-parser";
import UserService from "../services/UserService";

//method handle function login
let handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  //chaeck email and password not Null/undefined/empty
  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing input parameter",
    });
  }

  let userData = await UserService.handleUserLogin(email, password);

  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    user: userData.user ? userData.user : {},
  });
};
//get all user or 1 user by id
let handleGetAllUsers = async (req, res) => {
  let id = req.query.id; //all/id
  let users = await UserService.getAllUsers(id);
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters",
      users: [],
    });
  }
  //console.log(users);
  return res.status(200).json({
    errCode: 0,
    errMessage: "OK",
    users,
  });
};
//create new user
let handleCreateNewUser = async (req, res) => {
  let message = await UserService.createNewUser(req.body);
  //console.log(message);
  return res.status(200).json(message);
};
//edit info user
let handleEditUser = async (req, res) => {
  let data = req.body;
  let message = await UserService.updateUser(data);
  return res.status(200).json(message);
};
//delete user
let handleDeleteUser = async (req, res) => {
  if (!req.body.id) {
    return res.status.json(200)({
      errCode: 1,
      message: "Missing input parameter",
    });
  }
  let message = await UserService.deleteUser(req.body.id);
  return res.status(200).json(message);
};

let getAllCode = async (req, res) => {
  try {
    let data = await UserService.getAllCodeServices(req.query.type);
    return res.status(200).json(data);
  } catch (e) {
    console.log("Get all code error: ", e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from sever",
    });
  }
};
module.exports = {
  handleLogin: handleLogin,
  handleGetAllUsers: handleGetAllUsers,
  handleCreateNewUser: handleCreateNewUser,
  handleEditUser: handleEditUser,
  handleDeleteUser: handleDeleteUser,
  getAllCode: getAllCode,
};
