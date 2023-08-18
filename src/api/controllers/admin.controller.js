const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const adminService = require('../services/admin');

// @desc Login admin
// @route POST /api/admin/login
// @access public
const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error('All fields are mandatory !');
  }
  const admin = await adminService.adminExit(email);
  if (admin) {
    if (password === admin.password) {
      const accessToken = jwt.sign(
        {
          user: {
            role: 'admin',
            email: admin.email,
            id: admin._id,
          },
        },
        process.env.ACCESS_TOKEN_ADMIN_SECRET,
        {
          expiresIn: '59m',
        },
      );
      res.status(200).json({
        admin: { _id: admin._id, email: admin.email },
        auth: accessToken,
      });
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
    }
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc get limited users
// @route GET /api/admin/users
// @access private
const getAllusers = asyncHandler(async (req, res) => {
  let page = Number(req.query.page) || 1;
  const sortBy = req.query.sortBy || 'name';
  const filterBy = req.query.filterBy || null;

  const sortOptions = {};
  sortOptions[sortBy] = 1;
  let skip = (page - 1) * 5;
  const allUsers = await adminService.getAllusers(skip, sortOptions, filterBy);
  let count = await adminService.getUserCount();
  let response = {}
  response.users = allUsers;
  response.total = count;
  response.page = page;
  if (allUsers) {
    res.status(200).json(response);
  } else {
    res.status(401);
    throw new Error('Users data not found');
  }
});

// @desc get all users
// @route GET /api/admin/all-users
// @access private
const adminGetUsers = asyncHandler(async (req, res) => {
  const userData = await adminService.adminGetUsers();
  if (userData) {
    res.status(200).json(userData);
  } else {
    res.status(404);
    throw new Error('User data not found');
  }
});



module.exports = {
  loginAdmin,
  getAllusers,
  adminGetUsers,
};
