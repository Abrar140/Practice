const { validatetoken } = require("../Services/authentication");

function checkForAuthentication() {
  return (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
      return next();
    }
    try {
      const userPayload = validatetoken(token);
      req.user = userPayload;
    } catch (error) {
      console.log("Error here", error);
    }
    return next();
  };
}

module.exports = {
  checkForAuthentication,
};
