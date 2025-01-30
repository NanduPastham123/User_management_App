const authorizeRole = (role) => (req, res, next) => {
  console.log("ROLE:::::" ,  role);
  let roles = [...req.user?.roles];
  console.log("ROLES::" , roles);
  if (!roles.includes(role)) {
    return res.status(403).json({ error: "Forbidden: Insufficient privileges" });
  }
  next();
};

module.exports = { authorizeRole };
