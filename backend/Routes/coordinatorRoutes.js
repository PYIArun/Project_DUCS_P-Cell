const express = require("express");
const {
    getAllCoordinators,
    getCoordinatorByEmail,
    addCoordinator,
    updateCoordinator,
    deleteCoordinator
} = require("../Controllers/coordinatorController"); 


const router = express.Router();

// 🔹 GET all coordinators
router.get("/coordinators", getAllCoordinators);  // ✅ Fetch all coordinators

// 🔹 GET a specific coordinator by email
router.get("/:email", getCoordinatorByEmail);

// 🔹 POST a new coordinator
router.post("/", addCoordinator);

// 🔹 PUT (update) a coordinator by email
router.put("/:email", updateCoordinator);

// 🔹 DELETE a coordinator by email
router.delete("/:email", deleteCoordinator);

module.exports = router;
