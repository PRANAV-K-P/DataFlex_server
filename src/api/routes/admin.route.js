const express = require('express');
const router = express.Router();

const controller = require('../controllers/admin.controller');
const validateAdminToken = require('../middleware/validateAdminToken');

router.post('/login', controller.loginAdmin);

router.get('/users', validateAdminToken, controller.getAllusers);

router.get('/all-users', validateAdminToken, controller.adminGetUsers);


module.exports = router;
