const user = require('../models/Student');

const Auth = async (req, res, next) => {
  try {
    const userId = req.params.userId; // Assuming userId is passed in the request parameters
    const rootUser = await user
      .findOne({ _id: userId })
      .select('-password');

    if (!rootUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    req.rootUser = rootUser;
    req.rootUserId = rootUser._id;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server Error' });
  }
};

module.exports = { Auth };
