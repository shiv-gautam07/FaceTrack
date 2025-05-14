const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRouter = require('./routes/user.router');
const locationRouter = require('./routes/location.router');
const attendanceRouter = require('./routes/attendance.router');
const attendanceRuleRouter = require('./routes/attendanceRules.router');
const leaveRouter = require('./routes/leave.router');
//const dotenv = require('dotenv');

const app = express();
//dotenv.config();

//middleware
app.use(cors());
app.use('/public', express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(userRouter);
app.use(locationRouter);
app.use(attendanceRouter);
app.use(attendanceRuleRouter);
app.use(leaveRouter);
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
