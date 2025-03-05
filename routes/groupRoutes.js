const express = require('express');
const groupController = require('../controllers/groupController');

const router = express.Router();

router.use(authController.protect, authController.restrictTo('admin'));
router
  .route('/')
  .get(groupController.getAllGroups)
  .post(groupController.createGroup);

router
  .route('/:groupid')
  .get(groupController.getGroup)
  .patch(groupController.updateGroup)
  .delete(groupController.deleteGroup);

module.exports = router;
