const express = require("express");
const router = express.Router();
const roleController = require("../controllers/role.controller");

router.post("/createRole", roleController.createRole);
router.get("/getAllRoles", roleController.getAllRoles);
// router.get("/getRoleById", roleController.getRoleById);
router.put("/updateRole/:roleId", roleController.updateRole);
router.delete("/deleteRole/:roleId", roleController.deleteRole);
module.exports = router;
