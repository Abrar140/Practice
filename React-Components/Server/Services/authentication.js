// const JWT = require("jsonwebtoken");
// const secret = "$superman";

// function createtokenforusers(user) {
//   const payload = {
//     _id: user._id,
//     email: user.email,
//     fullName: user.fullName,
//     role: user.role,
//   };
//   const token = JWT.sign(payload, secret);
//   return token;
// }

// function validatetoken(token) {
//   const payload = JWT.verify(token, secret);
//   return payload;
// }

// module.exports = { createtokenforusers, validatetoken };
const JWT = require("jsonwebtoken");
const secret = "$superman";

function createtokenforusers(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    fullName: user.fullName,
    role: user.role,
  };
  const token = JWT.sign(payload, secret, { expiresIn: '1h' }); // added token expiration
  return token;
}

function validatetoken(token) {
  const payload = JWT.verify(token, secret);
  return payload;
}

module.exports = { createtokenforusers, validatetoken };
