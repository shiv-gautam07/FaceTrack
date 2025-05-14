const { matchedData, body } = require('express-validator');
const { MESSAGES } = require('../constants');
const db = require('../models');

class LeaveController {
  static async requestLeave(req, res) {
    try {
      const data = matchedData(req);
      const leaveReq = await db.LeaveRequest.create(data);
      res.status(201).json({
        success: true,
        message: MESSAGES.leaveReqCreated,
        data: leaveReq,
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: 'false', message: error.message, errors: null });
    }
  }
  static async fetchAll(req, res) {
    try {
      const offset = parseInt(req.query.offset, 10) || 0;
      const limit = parseInt(req.query.limit, 10) || 100;

      const locations = await db.LeaveRequest.findAndCountAll({
        include: [
          {
            model: db.User,
          },
        ],
        offset,
        limit,
      });

      res.status(200).json({
        success: true,
        message: MESSAGES.leaveReqDisplayed,
        data: locations,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = LeaveController;
