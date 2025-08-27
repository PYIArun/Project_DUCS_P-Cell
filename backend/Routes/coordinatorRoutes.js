import express from "express";
import {
    getAllCoordinators,
    getCoordinatorByEmail,
    addCoordinator,
    updateCoordinator,
    deleteCoordinator
} from "../Controllers/coordinatorController.js"; 


const router = express.Router();

// 🔹 GET all coordinators
router.get("/coordinators", getAllCoordinators);  

// 🔹 GET a specific coordinator by email
router.get("/coordinator/:email", getCoordinatorByEmail);

// 🔹 POST a new coordinator
router.post("/coordinator", addCoordinator);

// 🔹 PUT (update) a coordinator by email
router.put("/coordinator/:email", updateCoordinator);

// 🔹 DELETE a coordinator by email
router.delete("/coordinator/:email", deleteCoordinator);

export default router;
