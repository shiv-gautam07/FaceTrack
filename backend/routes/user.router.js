const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const UserController = require('../controllers/user.controller.js');
const validate = require('../middleware/request.validator.js');
const { isAdmin, validateToken } = require('../middleware/token.validator.js');
const multer = require('multer');
const { GENDER } = require('../constants/index.js');
const MiscController = require('../controllers/misc.controller.js');

//For uploading images
const upload = multer({
  dest: 'tempUpload',
  fileFilter: (req, file, cb) => {
    if (['image/jpeg', 'image/png', 'image/jpg'].includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error('Invalid file type. Only supported jpeg, jpg or png.', false),
      );
    }
  },
});

//For validating input
const validations = {
  firstName: key =>
    body(key).notEmpty().isLength({ min: 3, max: 50 }).trim().escape(),
  lastName: key =>
    body(key).notEmpty().isLength({ min: 3, max: 50 }).trim().escape(),
  email: key =>
    body(key)
      .notEmpty()
      .isEmail()
      .trim()
      .escape()
      .custom(UserController.checkIfExistByEmail),
  gender: key => body(key).notEmpty().isIn(Object.keys(GENDER)).trim(),
  roleId: key =>
    body(key).notEmpty().custom(MiscController.checkIfNotExistRole),
  department: key => body(key).notEmpty().trim().escape(),
  password: key => body(key).notEmpty().trim().escape(),
  confirmPassword: key =>
    body(key)
      .notEmpty()
      .custom((value, { req }) => {
        return value == req.body.password;
      })
      .trim()
      .escape(),
  phone: key => body(key).notEmpty().isInt({ gt: -1 }),
  address1: key => body(key).notEmpty().trim().escape(),
  address2: key => body(key).trim().escape(),
  street: key => body(key).notEmpty().trim().escape(),
  cityId: key =>
    body(key).notEmpty().custom(MiscController.checkIfNotExistCityId),
  stateCode: key =>
    body(key).notEmpty().custom(MiscController.checkIfNotExistStateCode),
  zipCode: key => body(key).notEmpty(),
  countryCode: key =>
    body(key).notEmpty().custom(MiscController.checkIfNotExistCountryCode),
};

router.post(
  '/signin',
  validate([
    body('email').notEmpty().isEmail().trim().escape(),
    body('password').notEmpty().trim().escape(),
  ]),
  UserController.signin,
);
router.post(
  '/users',
  validateToken,
  isAdmin,
  upload.single('profilePhoto'),
  validate(Object.keys(validations).map(item => validations[item](item))),
  UserController.createUser,
);
router.put(
  '/users/:id',
  validateToken,
  isAdmin,
  upload.single('profilePhoto'),
  validate(Object.keys(validations).map(item => validations[item](item))),
  UserController.updateUser,
);
router.patch(
  '/users/:id',
  validateToken,
  isAdmin,
  validate([
    body('fieldName').isString().withMessage('Field name must be a string'),
    body('fieldValue').custom((value, { req }) => {
      const fieldName = req.body.fieldName;
      if (validations[fieldName]) {
        return validations[fieldName]('fieldValue');
      }
      throw new Error('Unknown field name');
    }),
  ]),
  UserController.partialUpdateUser,
);
router.get('/users', validateToken, isAdmin, UserController.fetchAll);
router.get('/users/:id', validateToken, isAdmin, UserController.getUserById);
router.delete('/users/:id', validateToken, isAdmin, UserController.deleteUser);
module.exports = router;
