import express from "express";
import homeController from "../controllers/homeController";
import userControllers from "../controllers/userControllers";
import doctorControllers from "../controllers/doctorControllers";
let router = express.Router();

let initWebRouters = (app) => {
  //demo crud
  router.get("/", homeController.getHomePage);
  router.get("/about", homeController.getAboutPage);
  router.get("/crud", homeController.getCRUD);
  router.post("/post-crud", homeController.postCRUD);
  router.get("/get-crud", homeController.displayCRUD);
  router.get("/edit-crud", homeController.getEditCRUD);
  router.post("/put-crud", homeController.putCRUD);
  router.get("/delete-crud", homeController.deleteCRUD);
  //demo crud

  //api
  //user
  router.post("/api/login", userControllers.handleLogin);
  router.get("/api/get-all-users", userControllers.handleGetAllUsers);
  router.post("/api/create-new-user", userControllers.handleCreateNewUser);
  router.put("/api/edit-user", userControllers.handleEditUser);
  router.delete("/api/delete-user", userControllers.handleDeleteUser);
  router.get("/api/allcode", userControllers.getAllCode);

  //doctor
  router.get("/api/get-top-doctor", doctorControllers.getTopDoctor);
  router.get("/api/get-all-doctor", doctorControllers.getAllDoctors);
  router.post("/api/save-infor-doctor", doctorControllers.postInforDoctors);
  router.get("/api/get-detail-doctor-by-id", doctorControllers.getDetailDoctorById);
  router.post("/api/bulk-create-schedule", doctorControllers.bulkCreateSchedule);
  router.get("/api/get-schedule-doctor-by-date", doctorControllers.getScheduleByDate);


  return app.use("/", router);
};

module.exports = initWebRouters;
