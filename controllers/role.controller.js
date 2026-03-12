const roleService = require("../services/role.service");

const createRole = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newRole = await roleService.create(name, description);
    res.status(201).json(newRole);
  } catch (err) {
    console.log("Error creating role:", err);
    res.status(400).json({ message: "Could not create role" });
  }
};

const getAllRoles = async (req, res) => {
  try {
    const roles = await roleService.getAllRoles();
    res.status(200).json(roles);
  } catch (err) {
    res.status(500).json({ message: "Could not get roles" });
  }
};

const getRoleById = async (req, res) => {
  try {
    const { roleId } = req.params;
    const role = await roleService.getRoleById(roleId);
    res.status(200).json(role);
  } catch (err) {
    res.status(500).json({ message: "Could not get role" });
  }
};

const updateRole = async (req, res) => {
  try {
    const { roleId } = req.params;
    const { name, description } = req.body;

    const updatedRole = await roleService.updateRole(roleId, name, description);
    res.status(200).json(updatedRole);
  } catch (err) {
    res.status(400).json({ message: "Could not update role" });
  }
};

const deleteRole = async (req, res) => {
  try {
    const { roleId } = req.params;
    await roleService.deleteRole(roleId);
    res.status(200).json({ message: "Role deleted" });
  } catch (err) {
    res.status(400).json({ message: "Could not delete role" });
  }
};

module.exports = {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole,
};
