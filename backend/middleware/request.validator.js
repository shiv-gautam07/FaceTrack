const { MESSAGES } = require('../constants');
const { mapValidationError } = require('../misc');
const { rm } = require('fs');

// can be reused by many routes
const validate = validations => {
  return async (req, res, next) => {
    // sequential processing, stops running validations chain if one fails.
    for (const validation of validations) {
      const result = await validation.run(req);
      if (!result.isEmpty()) {
        if (req.file) {
          rm(req.file.path, err => {
            console.log('Removed temp file', err);
          });
        }

        return res.status(400).json({
          success: false,
          message: MESSAGES.validationFailed,
          errors: mapValidationError(result.array()),
        });
      }
    }

    next();
  };
};

module.exports = validate;
