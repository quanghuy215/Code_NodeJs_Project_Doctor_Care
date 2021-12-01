import db from "../models/index";

let handleUserLogin = (email, pasword) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkUserEmail(email);
      if (isExist) {
        //user already exist, then compare password
        let user = await db.User.findOne({
          attributes: ["email", "roleId"],
          where: { email: email },
          raw: true,
        });
        //check user exist again
        if (user) {
          //compare password
          let check = await compareUserPassword(pasword);
          if (check) {
            userData.errCode = 0;
            userData.errMessage = "OK";
            userData.user = user;
          } else {
            userData.errCode = 3;
            userData.errMessage = "Wrong password";
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = `User is not found`;
          resolve(userData);
        }
      } else {
        userData.errCode = 1;
        userData.errMessage = `Your's email isn't exist. Please try another email!`;
      }
      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
};
//compare password from input and db
let compareUserPassword = (userPassword) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { password: userPassword },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};
//check email from input and db
let checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: userEmail },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};
//get all user or 1 user
let getAllUsers = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      //id='ALL' ==> get all users
      if (userId === "ALL") {
        users = await db.User.findAll({
          attributes: {
            exclude: ["password"],
          },
          raw:true,
        });
      }
      //id='?' ==>get 1 user by id
      if (userId && userId !== "ALL") {
        users = await db.User.findOne({
          where: { id: userId },
          attributes: {
            exclude: ["password"],
          },
          raw:true,
        });
      }

      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  handleUserLogin: handleUserLogin,
  getAllUsers: getAllUsers,
};
