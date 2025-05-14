const express = require('express');
const { validateToken, isAdmin } = require('../middleware/token.validator');
const validate = require('../middleware/request.validator');
const { body } = require('express-validator');
const AttendanceController = require('../controllers/attendance.controller');
const router = express.Router();
// predict livePic against profilePic
const validations = {
  locLat: key => body(key).notEmpty().toFloat().isFloat({ min: -90, max: 90 }),
  locLng: key =>
    body(key).notEmpty().toFloat().isFloat({ min: -180, max: 180 }),
};
router.post(
  '/attendance/check-in',
  validateToken,
  validate(Object.keys(validations).map(item => validations[item](item))),
  AttendanceController.checkIn,
);

router.post(
  '/attendance/check-out',
  validateToken,
  validate(Object.keys(validations).map(item => validations[item](item))),
  AttendanceController.checkIn,
);

router.get(
  '/attendance',
  validateToken,
  isAdmin,
  AttendanceController.fetchAttendance,
);

router.get(
  '/attendance/:id',
  validateToken,
  isAdmin,
  AttendanceController.getAttendanceById,
);

router.get(
  '/face-detect-logs',
  validateToken,
  isAdmin,
  AttendanceController.fetchFaceDetectLogs,
);

module.exports = router;
