import db from "../models/index";

let handleUserLogin = (email, pasword) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkUserEmail(email);
      if (isExist) {
        //user already exist, then compare password
        let user = await db.User.findOne({
          attributes: ["id", "email", "roleId", "firstName", "lastName"],
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
//check email exists
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
          raw: true,
        });
      }
      //id='?' ==>get 1 user by id
      if (userId && userId !== "ALL") {
        users = await db.User.findOne({
          where: { id: userId },
          attributes: {
            exclude: ["password"],
          },
          raw: true,
        });
      }

      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};

//create new user
let createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      //let hashPasswordFromBcrypt = await hashUserPassword(data.password);
      //hash password fail, value in db
      //check email exist
      let check = await checkUserEmail(data.email);
      if (check === true) {
        resolve({
          errCode: 1,
          errMessage: "Your email is exists. Please try another email!",
        });
      } else {
        await db.User.create({
          email: data.email,
          password: data.password,
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          phoneNumber: data.phoneNumber,
          gender: data.gender,
          roleId: data.roleId,
          positionId: data.positionId,
          image: data.avatar,
        });
        resolve({
          errCode: 0,
          errMessage: "OK",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
//delete user
let deleteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    let user = await db.User.findOne({
      where: { id: userId },
    });
    if (!user) {
      resolve({
        errCode: 2,
        errMessage: `User isn't exist`,
      });
    }
    await db.User.destroy({
      where: { id: userId },
    });

    resolve({
      errCode: 0,
      errMessage: `User is deleted`,
    });
  });
};
//update user
let updateUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id || !data.roleId || !data.positionId || !data.gender) {
        resolve({
          errCode: 2,
          errMessage: "Missing id",
        });
      }
      let user = await db.User.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;
        user.roleId = data.roleId;
        user.positionId = data.positionId;
        user.gender = data.gender;
        user.phoneNumber = data.phoneNumber;

        await user.save();

        resolve({
          errCode: 0,
          message: "Update done",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: `User's not found!`,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllCodeServices = (typeInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!typeInput) {
        resolve({
          errCode: 1,
          errMessage: "Missing input",
        });
      } else {
        let res = {};
        let allcode = await db.Allcode.findAll({
          where: { type: typeInput },
        }); //get allcode data from db
        res.errCode = 0;
        res.data = allcode;
        resolve(res);
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  handleUserLogin: handleUserLogin,
  getAllUsers: getAllUsers,
  createNewUser: createNewUser,
  deleteUser: deleteUser,
  updateUser: updateUser,
  getAllCodeServices: getAllCodeServices,
};
