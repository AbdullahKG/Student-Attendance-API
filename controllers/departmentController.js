const { where } = require('sequelize');
const { Department } = require('../models/centralizedExports');

exports.getAllDepartments = async (req, res) => {
  try {
    const department = await Department.findAll({
      attributes: ['departmentid', 'departmentname'],
    });

    res.status(200).json({
      status: 'successful',
      result: department.length,
      data: {
        department,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createDepartment = async (req, res) => {
  try {
    const newDepartment = await Department.create({
      departmentname: req.body.departmentname,
    });

    res.status(200).json({
      status: 'success',
      data: {
        newDepartment,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getDepartment = async (req, res) => {
  try {
    const department = await Department.findByPk(req.params.departmentid);

    res.status(200).json({
      status: 'success',
      data: {
        department,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateDepartment = async (req, res) => {
  try {
    const [updatedRows] = await Department.update(
      { departmentname: req.body.departmentname },
      {
        where: {
          departmentid: req.params.departmentid,
        },
      }
    );

    res.status(200).json({
      status: 'success',
      message: 'Department updated successfully!',
      rowsAffected: updatedRows,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteDepartment = async (req, res) => {
  try {
    const deletedRows = await Department.destroy({
      where: {
        departmentid: req.params.departmentid,
      },
    });

    res.status(200).json({
      status: 'successful',
      message: `Department with departmentid = (${req.params.departmentid}) deleted succesfuly`,
      rowsAffected: deletedRows,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
    console.log(err);
  }
};
