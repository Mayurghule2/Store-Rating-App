const { ROLES } = require('../utils/constants');

const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: 'You do not have permission to perform this action' 
      });
    }
    next();
  };
};

const isAdmin = restrictTo(ROLES.ADMIN);
const isStoreOwner = restrictTo(ROLES.STORE_OWNER);
const isUser = restrictTo(ROLES.USER, ROLES.STORE_OWNER, ROLES.ADMIN);

module.exports = { restrictTo, isAdmin, isStoreOwner, isUser };