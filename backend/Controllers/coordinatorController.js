const Coordinator = require("../Models/Coordinators");

// ✅ Get all coordinators
const getAllCoordinators = async (req, res) => {
    try {
        const coordinators = await Coordinator.find();
        res.status(200).json(coordinators);
    } catch (error) {
        res.status(500).json({ message: "Error fetching coordinators", error });
    }
};

// ✅ Get a single coordinator by email
const getCoordinatorByEmail = async (req, res) => {
    try {
        const coordinator = await Coordinator.findOne({ email: req.params.email });

        if (!coordinator) {
            return res.status(404).json({ message: "Coordinator not found" });
        }

        res.status(200).json(coordinator);
    } catch (error) {
        res.status(500).json({ message: "Error fetching coordinator", error });
    }
};

// ✅ Add a new coordinator
const addCoordinator = async (req, res) => {
    try {
        const newCoordinator = new Coordinator(req.body);
        await newCoordinator.save();
        res.status(201).json({ message: "Coordinator added successfully", coordinator: newCoordinator });
    } catch (error) {
        res.status(400).json({ message: "Error adding coordinator", error });
    }
};

// ✅ Update an existing coordinator by email
const updateCoordinator = async (req, res) => {
    try {
        const updatedCoordinator = await Coordinator.findOneAndUpdate(
            { email: req.params.email },
            req.body,
            { new: true }
        );

        if (!updatedCoordinator) {
            return res.status(404).json({ message: "Coordinator not found" });
        }

        res.status(200).json({ message: "Coordinator updated successfully", coordinator: updatedCoordinator });
    } catch (error) {
        res.status(500).json({ message: "Error updating coordinator", error });
    }
};

// ✅ Delete a coordinator by email
const deleteCoordinator = async (req, res) => {
    try {
        const deletedCoordinator = await Coordinator.findOneAndDelete({ email: req.params.email });

        if (!deletedCoordinator) {
            return res.status(404).json({ message: "Coordinator not found" });
        }

        res.status(200).json({ message: "Coordinator deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting coordinator", error });
    }
};

// Export all functions
module.exports = {
    getAllCoordinators,
    getCoordinatorByEmail,
    addCoordinator,
    updateCoordinator,
    deleteCoordinator,
};
