import express from "express";
import homeController from "../controllers/homeController";
import userControllers from "../controllers/userControllers"
let router = express.Router();

let initWebRouters = (app) => {
    //demo crud
    router.get('/' , homeController.getHomePage);
    router.get('/about' , homeController.getAboutPage);
    router.get('/crud' ,homeController.getCRUD);
    router.post('/post-crud' ,homeController.postCRUD);
    router.get('/get-crud' ,homeController.displayCRUD);
    router.get('/edit-crud' ,homeController.getEditCRUD);
    router.post('/put-crud' ,homeController.putCRUD);
    router.get('/delete-crud' ,homeController.deleteCRUD);
    //demo crud

    //api
    router.post('/api/login' , userControllers.handleLogin)
    router.get('/api/get-all-users' , userControllers.handleGetAllUsers)

    return app.use("/", router);
}

module.exports = initWebRouters;