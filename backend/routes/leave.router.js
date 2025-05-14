const multer = require('multer');
const { validateToken } = require('../middleware/token.validator');
const router = require('./attendanceRules.router');
const validate = require('../middleware/request.validator');
const { body } = require('express-validator');
const LeaveController = require('../controllers/leave.controller');

//For uploading images
const upload = multer({
  dest: 'tempUpload',
  fileFilter: (req, file, cb) => {
    if (
      ['document/pdf', 'image/jpeg', 'image/png', 'image/jpg'].includes(
        file.mimetype,
      )
    ) {
      cb(null, true);
    } else {
      cb(
        new Error('Invalid file type. Only supported jpeg, jpg or png.', false),
      );
    }
  },
});

const validations = {
  leaveType: key => body(key).notEmpty().isString().trim().escape(),
  userId: key => body(key).notEmpty().isInt(),
  duration: key => body(key).notEmpty().isInt(),
  from: key => body(key).notEmpty().isDate(),
  to: key => body(key).notEmpty().isDate(),
  reason: key => body(key).notEmpty().isString().trim().escape(),
};
router.post(
  '/leave',
  validateToken,
  upload.single('leaveFile'),
  validate(Object.keys(validations).map(item => validations[item](item))),

  LeaveController.requestLeave,
);
router.get('/leave', validateToken, LeaveController.fetchAll);
module.exports = router;
