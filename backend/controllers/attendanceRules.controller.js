const { matchedData } = require('express-validator');
const { MESSAGES } = require('../constants');
const db = require('../models');

class attendanceRuleController {
  static async getRules(req, res) {
    try {
      const rules = await db.AttendanceRules.findAll();
      res.status(200).json({
        status: 'true',
        message: MESSAGES.attendanceRuleDisplay,
        data: rules,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ status: 'false', message: error.message, errors: null });
    }
  }
  static async updateRules(req, res) {
    try {
      const { id } = req.params;
      const rule = await db.AttendanceRules.findByPk(id);

      if (!rule) {
        return res.status(404).json({
          success: false,
          message: MESSAGES.attendanceRuleNotFound,
        });
      }
      const data = matchedData(req);
      Object.assign(rule, data);
      await rule.save();

      res.status(200).json({
        success: true,
        message: MESSAGES.attendanceRuleUpdated,
        data: rule,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async partialUpdateRules(req, res) {
    try {
      const { id } = req.params;
      const rule = await db.AttendanceRules.findByPk(id);
      if (!rule) {
        return res.status(404).json({
          success: false,
          message: MESSAGES.attendanceRuleNotFound,
          errors: null,
        });
      }

      const validFields = [
        'gracePeriod',
        'lateThreshold',
        'leaveTypes',
        'annualLeave',
        'enableHalfDay',
        'autoDeductLeave',
        'markAbsentAfter',
        'enableAbsentAlert',
        'notifyAdmin',
      ];
      const { fieldName, fieldValue } = req.body;

      if (!fieldName || !fieldValue) {
        return res.status(500).json({
          success: false,
          message: MESSAGES.missingFieldData,
          errors: null,
        });
      }

      if (!validFields.includes(fieldName)) {
        return res.status(500).json({
          success: false,
          message: MESSAGES.invalidFieldUpdate,
          errors: null,
        });
      }

      rule[fieldName] = fieldValue;
      await rule.save();

      res.status(200).json({
        success: true,
        message: MESSAGES.attendanceRuleUpdated,
        data: rule,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = attendanceRuleController;
