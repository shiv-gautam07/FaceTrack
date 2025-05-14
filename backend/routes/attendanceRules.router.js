const express = require('express');
const { validateToken, isAdmin } = require('../middleware/token.validator');
const validate = require('../middleware/request.validator');
const attendanceRuleController = require('../controllers/attendanceRules.controller');
const { check, body } = require('express-validator');
const router = express.Router();

const validations = {
  gracePeriod: key => body(key).notEmpty().isInt(),
  lateThreshold: key => body(key).notEmpty().isInt(),
  leaveTypes: key => body(key).notEmpty().isString().trim().escape(),
  annualLeave: key => body(key).notEmpty().isInt(),
  enableHalfDay: key => body(key).notEmpty().isBoolean(),
  autoDeductLeave: key => body(key).notEmpty().isBoolean(),
  markAbsentAfter: key => body(key).notEmpty().isInt(),
  enableAbsentAlert: key => body(key).notEmpty().isBoolean(),
  notifyAdmin: key => body(key).notEmpty().isInt(),
};

router.get(
  '/settings',
  validateToken,
  isAdmin,
  attendanceRuleController.getRules,
);

router.put(
  '/settings/:id',
  validateToken,
  isAdmin,
  validate(Object.keys(validations).map(item => validations[item](item))),
  attendanceRuleController.updateRules,
);

router.patch(
  '/settings/:id',
  validateToken,
  isAdmin,
  validate([
    check('fieldName').isString().notEmpty(),
    check('fieldValue').isString().notEmpty(),
  ]),
  attendanceRuleController.partialUpdateRules,
);
module.exports = router;
