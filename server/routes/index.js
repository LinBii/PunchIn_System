const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();

const passport = require('../config/passport.js');

const attendanceController = require('../controllers/apis/attendance-controller');
const userController = require('../controllers/apis/user-controller');

const { authenticated } = require('../middleware/api-auth');

const { apiErrorHandler } = require('../middleware/error-handler');

router.get('/get_current_user', authenticated, userController.getCurrentUser);

router.post('/attendances', authenticated, attendanceController.postAttendance);
router.put(
  '/attendances/:id',
  authenticated,
  attendanceController.updateAttendance
);

router.put(
  '/users/:id',
  authenticated,
  upload.array(),
  userController.updatePassword
);

router.post(
  '/signin',
  passport.authenticate('local', { session: false }),
  userController.signIn
);
router.post('/signup', userController.signUp);

router.use('/', apiErrorHandler);

module.exports = router;
