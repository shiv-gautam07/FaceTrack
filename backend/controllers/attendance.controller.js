const { Op } = require('sequelize');
const { STATUS, ATTENDANCE_STATUSES, MESSAGES } = require('../constants');
const db = require('../models');
const { sequelize } = require('../models');
const { matchedData } = require('express-validator');
// predict livePic against profilePic
class AttendanceController {
  static async checkIn(req, res) {
    try {
      const { locLat, locLng } = matchedData(req);
      const { id: userId } = req.user;

      console.log('Input lat,lng', locLat, locLng);

      // const matchedLoc = await db.GeofenceLocation.findAll({
      //   where: {
      //     [Op.and]: [
      //       sequelize.fn(
      //         'ACOS',
      //         sequelize.fn('SIN', sequelize.fn('RADIANS', parseFloat(locLat))),
      //         sequelize.fn(
      //           'SIN',
      //           sequelize.fn('RADIANS', sequelize.col('allowedLat')),
      //         ),
      //         sequelize.fn('COS', sequelize.fn('RADIANS', parseFloat(locLat))),
      //         sequelize.fn(
      //           'COS',
      //           sequelize.fn('RADIANS', sequelize.col('allowedLng')),
      //         ),
      //         sequelize.fn(
      //           'COS',
      //           sequelize.fn('RADIANS', sequelize.col('allowedLng')) -
      //             sequelize.fn('RADIANS', parseFloat(locLng)),
      //         ),
      //       ) *
      //         6371000 <=
      //         sequelize.col('radiusMeter'),
      //     ],
      //   },
      // });
      const matchedLoc = await db.GeofenceLocation.findAll({
        where: sequelize.literal(`
          6371000 * ACOS(
            SIN(RADIANS(${parseFloat(locLat)})) * SIN(RADIANS(allowedLat)) +
            COS(RADIANS(${parseFloat(locLat)})) * COS(RADIANS(allowedLat)) *
            COS(RADIANS(allowedLng) - RADIANS(${parseFloat(locLng)}))
          ) <= radiusMeters
        `),
      });

      console.log('checking matched loc ' + matchedLoc.length);
      if (!matchedLoc.length) {
        return res.status(500).json({
          success: 'false',
          message: MESSAGES.checkInNotAllowed,
          errors: null,
        });
      }

      const checkIn = await db.Attendance.create({
        userId,
        checkInTime: new Date(),
        locationLat: locLat,
        locationLng: locLng,
        status: ATTENDANCE_STATUSES.Present,
      });
      res
        .status(200)
        .json({ success: 'true', message: MESSAGES.checkIn, data: checkIn });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
  // static async checkOut(req, res) {
  //   try {
  //     const { id } = req.params;
  //     const checkOut = await db.Attendance.create({
  //       checkOutTime: new Date(),
  //     });
  //     res
  //       .status(200)
  //       .json({ success: 'true', message: MESSAGES.checkOut, data: checkIn });
  //   } catch (error) {
  //     res.status(500).json({ success: false, message: error.message });
  //   }
  // }
  static async fetchAttendance(req, res) {
    const { offset, limit, searchPhrase } = req.query;
    let conditions = {};
    if (searchPhrase) {
      conditions = {
        where: {
          [Op.or]: {
            firstName: {
              [Op.like]: `${searchPhrase}%`,
            },
            lastName: {
              [Op.like]: `${searchPhrase}%`,
            },
          },
        },
      };
    }

    try {
      const attendance = await db.Attendance.findAndCountAll({
        include: { model: db.User, ...conditions },
        offset: parseInt(offset || '0', 10),
        limit: parseInt(limit || '100', 10),
      });
      res.status(200).json({
        success: 'true',
        message: MESSAGES.attendanceDisplay,
        data: attendance,
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: 'false', message: error.message, errors: null });
    }
  }
  static async getAttendanceById(req, res) {
    try {
      const { id } = req.params;
      const attendance = await db.Attendance.findByPk(id);
      res.status(200).json({
        success: 'true',
        message: MESSAGES.attendanceDisplay,
        data: attendance,
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: 'false', message: error.message, errors: null });
    }
  }
  static async fetchFaceDetectLogs(req, res) {
    const { offset, limit, searchPhrase } = req.query;
    let conditions = {};
    if (searchPhrase) {
      conditions = {
        where: {
          [Op.or]: {
            firstName: {
              [Op.like]: `${searchPhrase}%`,
            },
            lastName: {
              [Op.like]: `${searchPhrase}%`,
            },
          },
        },
      };
    }

    try {
      const logs = await db.FaceRecognitionLog.findAndCountAll({
        include: { model: db.User, ...conditions },
        offset: parseInt(offset || '0', 10),
        limit: parseInt(limit || '100', 10),
      });
      res.status(200).json({
        success: 'true',
        message: MESSAGES.faceDetectLogsDisplay,
        data: logs,
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: 'false', message: error.message, errors: null });
    }
  }
}
module.exports = AttendanceController;
