import express from "express";
import homeController from "../controllers/homeController";
import userControllers from "../controllers/userControllers";
import doctorControllers from "../controllers/doctorControllers";
import patientControllers from '../controllers/patientControllers'
import specialtyControllers from '../controllers/specialtyController'


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
  router.get("/api/get-doctor-extra-infor-by-id", doctorControllers.getDoctorExtraInforById);
  router.get("/api/get-profile-doctor-by-id", doctorControllers.getProfileDoctorById);
  router.get("/api/get-list-patient", doctorControllers.getListPatient);
  router.post("/api/send-bill", doctorControllers.sendBill);
 
 //specialty
  router.post("/api/create-new-specialty", specialtyControllers.createSpecialty);
  router.get("/api/get-all-specialty", specialtyControllers.getAllSpecialty);
  router.get("/api/get-detail-specialty-by-id", specialtyControllers.getDetailSpecialty);
  
  
  //patient
  router.post("/api/patient-book-appointment", patientControllers.postBookAppointment);
  router.post("/api/verify-booking-appointment", patientControllers.postVerifyBookAppointment);


  return app.use("/", router);
};

module.exports = initWebRouters;
