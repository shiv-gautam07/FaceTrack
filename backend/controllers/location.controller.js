const { matchedData } = require('express-validator');
const { MESSAGES } = require('../constants');
const db = require('../models');

class LocationController {
  //Creating location
  static async createLocation(req, res) {
    try {
      const data = matchedData(req);
      const location = await db.GeofenceLocation.create(data);

      res.status(201).json({
        success: true,
        message: MESSAGES.locationCreated,
        data: location,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  //Updating location
  static async updateLocation(req, res) {
    try {
      const { id } = req.params;
      const location = await db.GeofenceLocation.findByPk(id);

      if (!location) {
        return res.status(404).json({
          success: false,
          message: MESSAGES.locationNotFound,
        });
      }

      const data = matchedData(req);
      Object.assign(location, data);
      await location.save();

      res.status(200).json({
        success: true,
        message: MESSAGES.locationUpdated,
        data: location,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  //Partial update in location
  static async partialUpdateLocation(req, res) {
    try {
      const { id } = req.params;
      const location = await db.GeofenceLocation.findByPk(id);
      if (!location) {
        return res.status(404).json({
          success: false,
          message: MESSAGES.locationNotFound,
        });
      }

      const validFields = [
        'locationName',
        'address',
        'allowedLat',
        'allowedLng',
        'radiusMeters',
      ];
      const { fieldName, fieldValue } = req.body;

      if (!validFields.includes(fieldName)) {
        return res
          .status(400)
          .json({ success: false, message: MESSAGES.invalidFieldUpdate });
      }

      location[fieldName] = fieldValue;
      await location.save();

      res.status(200).json({
        success: true,
        message: MESSAGES.locationUpdated,
        data: location,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // delete a location  by id
  static async delete(req, res) {
    try {
      const { id } = req.params;
      const location = await db.GeofenceLocation.findByPk(id);
      if (!location) {
        return res.status(404).json({
          success: false,
          message: MESSAGES.locationNotFound,
        });
      }
      await location.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  //Get location by id
  static async getLocationById(req, res) {
    try {
      const { id } = req.params;
      const location = await db.GeofenceLocation.findByPk(id);
      if (!location) {
        return res.status(404).json({
          success: false,
          message: MESSAGES.locationNotFound,
        });
      }
      res.status(200).json({
        success: true,
        message: MESSAGES.locationDisplayed,
        data: location,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  //Get all locations by id
  static async fetchAll(req, res) {
    try {
      const offset = parseInt(req.query.offset, 10) || 0;
      const limit = parseInt(req.query.limit, 10) || 100;

      const locations = await db.GeofenceLocation.findAndCountAll({
        include: [
          {
            model: db.User,
            through: db.UserGeoLocations,
          },
        ],
        offset,
        limit,
      });

      res.status(200).json({
        success: true,
        message: MESSAGES.fetchAllLocations,
        data: locations,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  //Get assigned users
  static async getAssignedUsers(req, res) {
    try {
      const { id } = req.params;

      const location = await db.GeofenceLocation.findByPk(id);

      if (!location) {
        return res.status(404).json({
          success: false,
          message: MESSAGES.locationNotFound,
        });
      }

      const offset = parseInt(req.query.offset, 10) || 0;
      const limit = parseInt(req.query.limit, 10) || 100;

      const users = await db.User.findAndCountAll({
        include: [
          {
            model: db.GeofenceLocation,
            through: db.UserGeoLocations,
            where: { id },
          },
        ],
        includeIgnoreAttributes: false,
        attributes: [
          'firstName',
          'lastName',
          'email',
          'department',
          'profilePhoto',
        ],
        offset,
        limit,
      });

      if (users.count === 0) {
        return res.status(500).json({
          success: false,
          message: MESSAGES.userNotAssignedLocation,
          errors: null,
        });
      }

      res.status(200).json({
        success: true,
        message: MESSAGES.fetchAllUserLocation,
        data: users,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async unassignUser(req, res) {
    const transaction = await db.sequelize.transaction();
    try {
      const { id, userId } = req.params;
      const location = await db.GeofenceLocation.findByPk(id);
      if (!location) {
        return res.status(404).json({
          success: false,
          message: MESSAGES.locationNotFound,
          errors: null,
        });
      }
      const user = await db.User.findByPk(userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: MESSAGES.userNotFound,
          errors: null,
        });
      }

      const userLocation = await db.UserGeoLocations.findOne({
        where: { userId, locationId: location.id },
      });
      if (!userLocation) {
        res.status(404).json({
          success: false,
          message: MESSAGES.userNotAssignedLocation,
          errors: null,
        });
      }
      await userLocation.destroy();
      await transaction.commit();

      return res.status(200).json({
        success: true,
        message: MESSAGES.userUnassigned,
      });
    } catch (error) {
      await transaction.rollback();
      res.status(500).json({ success: false, message: error.message });
    }
  }
  static async assignUser(req, res) {
    const transaction = await db.sequelize.transaction();
    try {
      const { id } = req.params;
      const { users } = req.body;

      const location = await db.GeofenceLocation.findByPk(id);
      if (!location) {
        return res.status(404).json({
          success: false,
          message: MESSAGES.locationNotFound,
          data: null,
        });
      }
      let resultUsers = {};
      for (const userId of users) {
        const user = await db.User.findByPk(userId);
        if (!user) {
          resultUsers[userId] = 'NOTFOUND';
        } else {
          const userLocation = await db.UserGeoLocations.findOne({
            where: { userId, locationId: location.id },
          });
          if (userLocation) {
            resultUsers[userId] = 'ALREADY-EXISTS';
          } else {
            await db.UserGeoLocations.create(
              {
                userId: userId,
                locationId: location.id,
              },
              { transaction },
            );
            resultUsers[userId] = 'ASSIGNED';
          }
        }
      }
      await transaction.commit();

      return res.status(200).json({
        success: true,
        message: MESSAGES.userAssigned,
        data: resultUsers,
      });
    } catch (error) {
      await transaction.rollback();
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = LocationController;
