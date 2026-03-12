const Role = require("../models/Role");

const create = async (name, description) => {
  try {
    const existingRole = await Role.findOne({ name: name });
    if (existingRole) {
      throw new Error("Role with this name already exists");
    }
    const newRole = new Role({
      name,
      description,
    });
    await newRole.save();
    return newRole;
  } catch (err) {
    throw new Error("Could not create role");
  }
};

const getAllRoles = async () => {
  return await Role.find();
};

const getRoleById = async (roleId) => {
  const role = await Role.findOne({ _id: roleId });

  if (!role) {
    throw new Error("Role not found");
  }
  return role;
};
const updateRole = async (roleId, name, description) => {
  const role = await getRoleById(roleId);
  role.name = name;
  role.description = description;
  await role.save();
  return role;
};
const deleteRole = async (roleId) => {
  const role = await Role.findByIdAndDelete(roleId);

  if (!role) {
    throw new Error("Role not found");
  }

  return role;
};

module.exports = {
  create,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole,
};
