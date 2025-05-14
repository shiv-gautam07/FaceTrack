const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { sign, verify } = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET || 'ABC@123';

function genPasswordHash(password) {
  const genSalt = genSaltSync(10);
  const hash = hashSync(password, genSalt);
  return hash;
}

function validatePasswordHash(password, hash) {
  return compareSync(password, hash);
}
function genJwtToken(payload) {
  return sign(payload, jwtSecret, { expiresIn: '2h' });
}

function verifyJwtToken(token, cb) {
  verify(token, jwtSecret, cb);
}

function mapValidationError(errors) {
  return (errors || []).reduce((prev, curr) => {
    prev[curr.path] = curr.msg;
    return prev;
  }, {});
}
module.exports = {
  genPasswordHash,
  validatePasswordHash,
  genJwtToken,
  verifyJwtToken,
  mapValidationError,
};
