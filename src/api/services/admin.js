const Admin = require('../models/admin.model');
const User = require('../models/user.model');

module.exports = {
  adminExit: async (email) => {
    const adminAvailable = await Admin.findOne({ email });
    if (adminAvailable) {
      return adminAvailable;
    }
    return false;
  },
  getAllusers: async (skip, sortOptions, filterBy) => {
    const query = filterBy ? { gender: filterBy } : {};
    const allUsers = await User.find(query, { name: 1, email: 1, gender: 1 })
      .sort(sortOptions)
      .skip(skip)
      .limit(5);
    if (allUsers) {
      return allUsers;
    }
    return false;
  },
  adminGetUsers: async () => {
    const allUsers = await User.find({}, { name: 1, email: 1, gender: 1, createdAt: 1 })
    if (allUsers) {
      return allUsers;
    }
    return false;
  },
  getUserCount: async () => {
    let count = await User.countDocuments();
    if (count) {
      return count;
    }
    return false;
  },
};
