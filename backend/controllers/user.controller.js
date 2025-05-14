const { matchedData } = require('express-validator');
const {
  genJwtToken,
  validatePasswordHash,
  genPasswordHash,
} = require('../misc');
const { MESSAGES } = require('../constants');
const db = require('../models');
const fs = require('fs');
const { error } = require('console');
const { where, Op } = require('sequelize');

const userAvatarUploadRename = (user, req) => {
  console.log('requested file: ', req.file);
  const newFilepath =
    'public/user-images/' +
    user.id +
    '.' +
    req.file.originalname.split('.').pop();
  fs.rename(req.file.path, newFilepath, async err => {
    if (err) {
      throw err;
    }
    user.profilePhoto = newFilepath;
    await user.save();

    console.log('Rename of profile photo path successful');
  });
};

class UserController {
  static async checkIfExistByEmail(email, { req }) {
    const { id: userId } = req.params;
    const cond = { email: email };
    if (userId) {
      cond.id = { [Op.ne]: userId };
    }
    const existingUser = await db.User.findOne({ where: cond });
    if (existingUser) {
      throw new Error(MESSAGES.userAlreadyExist);
    }
  }
  //User Signin
  static async signin(req, res) {
    let { email, password } = matchedData(req);
    const foundUser = await db.User.findOne({
      where: { email: email },
      include: {
        model: db.Role,
        through: db.UserRole,
        attributes: ['role'],
      },
    });
    console.log('Found User', foundUser);
    if (!foundUser) {
      return res.status(400).json({
        success: false,
        message: MESSAGES.invalidLoginOrPassword,
        errors: null,
      });
    }

    if (!validatePasswordHash(password, foundUser.password)) {
      return res.status(400).json({
        success: false,
        message: MESSAGES.invalidLoginOrPassword,
        errors: null,
      });
    }

    res.status(200).json({
      success: true,
      message: MESSAGES.userSigninSuccess,
      data: {
        fullName: `${foundUser.firstName} ${foundUser.lastName}`,
        roles: foundUser.Roles.map(role => role.role),
        token: genJwtToken({
          userId: foundUser.id,
          fullName: `${foundUser.firstName} ${foundUser.lastName}`,
          roles: foundUser.Roles.map(role => role.role),
        }),
      },
    });
  }
  // Create User
  static async createUser(req, res) {
    const {
      firstName,
      lastName,
      email,
      gender,
      department,
      password,
      profilePhoto,
      phone,
      address1,
      address2,
      street,
      cityId,
      stateCode,
      zipCode,
      countryCode,
      roleId,
    } = matchedData(req);

    const transaction = await db.sequelize.transaction();
    try {
      const user = await db.User.create(
        {
          firstName,
          lastName,
          email,
          gender,
          department,
          password: genPasswordHash(password),
          profilePhoto,
          phone,
        },
        { transaction },
      );
      const userId = user.id;
      await db.Address.create(
        {
          userId,
          address1,
          address2,
          street,
          cityId,
          stateCode,
          zipCode,
          countryCode,
        },
        { transaction },
      );
      await db.UserRole.create(
        {
          userId,
          roleId,
        },
        { transaction },
      );
      userAvatarUploadRename(user, req);
      await transaction.commit();
      res
        .status(200)
        .json({ success: true, message: MESSAGES.userCreated, data: user });
    } catch (err) {
      console.log('Error while creating user', err);
      await transaction.rollback();
      res.status(200).json({
        success: false,
        message: MESSAGES.userNotCreated,
        errors: null,
      });
    }
  }

  // Update existing user
  static async updateUser(req, res) {
    const { id } = req.params;
    const {
      firstName,
      lastName,
      email,
      gender,
      department,
      password,
      profilePhoto,
      phone,
      address1,
      address2,
      street,
      cityId,
      stateCode,
      zipCode,
      countryCode,
      roleId,
    } = req.body;

    const transaction = await db.sequelize.transaction();
    try {
      const user = await db.User.findByPk(id);

      if (!user) {
        return res.status(500).json({
          status: false,
          message: MESSAGES.userNotFound,
          errors: null,
        });
      }

      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email;
      user.gender = gender;
      user.department = department;
      user.password = genPasswordHash(password);
      user.profilePhoto = profilePhoto;
      user.phone = phone;
      await user.save({ transaction });

      const address = await db.Address.findOne({ where: { userId: id } });
      if (!address) {
        //insert
        await db.Address.create(
          {
            userId: user.id,
            address1,
            address2,
            street,
            cityId,
            stateCode,
            zipCode,
            countryCode,
          },
          { transaction },
        );
      } else {
        address.address1 = address1;
        address.address2 = address2;
        address.street = street;
        address.cityId = cityId;
        address.stateCode = stateCode;
        address.zipCode = zipCode;
        address.countryCode = countryCode;
        address.roleId = roleId;
        await address.save({ transaction });
      }

      const role = await db.UserRole.findOne({ where: { userId: id } });
      if (role) {
        //remove matching records
        await db.UserRole.destroy({ where: { userId: id } }), { transaction };
      }
      // insert user role here
      await db.UserRole.create(
        {
          userId: user.id,
          roleId,
        },
        { transaction },
      );
      userAvatarUploadRename(user, req);
      await transaction.commit();
      res
        .status(200)
        .json({ status: true, message: MESSAGES.userUpdated, data: user });
    } catch (err) {
      console.log('error while updating user: ', err);
      await transaction.rollback();
      res.status(200).json({
        success: false,
        message: MESSAGES.userNotUpdated,
        errors: null,
      });
    }
  }

  //Partial Update existing user
  static async partialUpdateUser(req, res) {
    const { id } = req.params;
    const { fieldName, fieldValue } = req.body;

    const transaction = await db.sequelize.transaction();
    try {
      const user = await db.User.findByPk(id, { transaction });

      if (!user) {
        await transaction.rollback();

        return res.status(500).json({
          success: false,
          message: MESSAGES.userNotExist,
          errors: null,
        });
      }

      user[fieldName] = fieldValue;
      await user.save({ transaction });

      res
        .status(200)
        .json({ status: true, message: MESSAGES.userUpdated, data: user });
    } catch (err) {
      console.error('Error while updating the user: ', err);

      await transaction.rollback();

      return res.status(500).json({
        success: false,
        message: MESSAGES.userNotExist,
        errors: null,
      });
    }
  }

  //Get a user by id
  static async getUserById(req, res) {
    const { id } = req.params;
    const user = await db.User.findByPk(id);
    if (!user) {
      return res
        .status(500)
        .json({ success: false, message: MESSAGES.userNotExist, errors: null });
    }
    return res
      .status(200)
      .json({ success: true, message: MESSAGES.userDisplayed, data: user });
  }

  //List all the users
  static async fetchAll(req, res) {
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
            email: {
              [Op.like]: `${searchPhrase}%`,
            },
            department: {
              [Op.like]: `${searchPhrase}%`,
            },
          },
        },
      };
    }
    const users = await db.User.findAndCountAll({
      attributes: [
        'firstName',
        'lastName',
        'email',
        'department',
        'gender',
        'profilePhoto',
        'phone',
        'createdAt',
        'updatedAt',
      ],
      offset: parseInt(offset || '0', 10),
      limit: parseInt(limit || '100', 10),
      ...conditions,
    });
    res.status(200).json({
      success: true,
      message: MESSAGES.fetchAllUsers,
      data: users,
    });
  }
  // Delete User
  static async deleteUser(req, res) {
    const { id } = req.params;
    const transaction = await db.sequelize.transaction();
    try {
      const user = await db.User.findByPk(id);

      if (!user) {
        return res.status(500).json({
          status: false,
          message: MESSAGES.userNotFound,
          errors: null,
        });
      }

      const address = await db.Address.findOne({ where: { userId: id } });
      if (!address) {
        return res.status(500).json({
          status: false,
          message: MESSAGES.addressNotFound,
          errors: null,
        });
      }

      const role = await db.UserRole.findOne({ where: { userId: id } });
      if (!role) {
        return res.status(500).json({
          status: false,
          message: MESSAGES.roleNotFound,
          errors: null,
        });
      }

      await role.destroy({ transaction });
      await address.destroy({ transaction });
      await user.destroy({ transaction });

      await transaction.commit();

      res
        .status(200)
        .json({ status: true, message: MESSAGES.userDeleted, data: user });
    } catch (err) {
      console.error('Error while deleting the user: ', err);

      await transaction.rollback();

      return res.status(500).json({
        status: false,
        message: MESSAGES.userNotDeleted,
        errors: null,
      });
    }
  }
}

module.exports = UserController;
