const { where } = require('sequelize');
const { Group } = require('../models/centralizedExports');

exports.getAllGroups = async (req, res) => {
  try {
    const group = await Group.findAll({ attributes: ['groupid', 'grouptype'] });

    res.status(200).json({
      status: 'successful',
      result: group.length,
      data: {
        group,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createGroup = async (req, res) => {
  try {
    const newGroup = await Group.create({
      grouptype: req.body.grouptype,
    });

    res.status(200).json({
      status: 'success',
      data: {
        newGroup,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getGroup = async (req, res) => {
  try {
    const group = await Group.findByPk(req.params.groupid);

    res.status(200).json({
      status: 'success',
      data: {
        group,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateGroup = async (req, res) => {
  try {
    const [updatedRows] = await Group.update(
      { grouptype: req.body.grouptype },
      {
        where: {
          groupid: req.params.groupid,
        },
      }
    );

    res.status(200).json({
      status: 'success',
      message: 'Group updated successfully!',
      rowsAffected: updatedRows,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteGroup = async (req, res) => {
  try {
    const deletedRows = await Group.destroy({
      where: {
        groupid: req.params.groupid,
      },
    });

    res.status(200).json({
      status: 'successful',
      message: `Group with groupid = (${req.params.groupid}) deleted succesfuly`,
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
