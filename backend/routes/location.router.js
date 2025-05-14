const express = require('express');
const { body, check } = require('express-validator');
const { validateToken, isAdmin } = require('../middleware/token.validator');
const router = express.Router();
const LocationController = require('../controllers/location.controller.js');
const validate = require('../middleware/request.validator.js');

const validations = {
  locationName: key =>
    body(key).notEmpty().isLength({ min: 3, max: 99 }).trim().escape(),
  address: key =>
    body(key).notEmpty().isLength({ min: 3, max: 99 }).trim().escape(),
  allowedLat: key =>
    body(key).notEmpty().toFloat().isFloat({ min: -90, max: 90 }),
  allowedLng: key =>
    body(key).notEmpty().toFloat().isFloat({ min: -180, max: 180 }),
  radiusMeters: key => body(key).notEmpty().isInt({ min: 1 }),
};

router.post(
  '/location',
  validateToken,
  isAdmin,
  validate(Object.keys(validations).map(item => validations[item](item))),
  LocationController.createLocation,
);

router.put(
  '/location/:id',
  validateToken,
  isAdmin,
  validate(Object.keys(validations).map(item => validations[item](item))),
  LocationController.updateLocation,
);

router.patch(
  '/location/:id',
  validateToken,
  isAdmin,
  validate([
    check('fieldName').isString().notEmpty(),
    check('fieldValue').isString().notEmpty(),
  ]),
  LocationController.partialUpdateLocation,
);

router.delete(
  '/location/:id',
  validateToken,
  isAdmin,
  LocationController.delete,
);

router.get('/location/:id', validateToken, LocationController.getLocationById);

router.get('/location/', validateToken, LocationController.fetchAll);

router.get(
  '/location/:id/users',
  validateToken,
  isAdmin,
  LocationController.getAssignedUsers,
);

router.delete(
  '/location/:id/users/:userId',
  validateToken,
  isAdmin,
  LocationController.unassignUser,
);

router.post(
  '/location/:id/users',
  validateToken,
  isAdmin,
  LocationController.assignUser,
);

module.exports = router;
