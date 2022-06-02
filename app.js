const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const login = require('./routes/login')
const ISP_Charge = require('./routes/ISP_Charge')
const processjs = require('./routes/processjs')
const EquipmentUsed = require('./routes/EquipmentUsed')
const Architecture = require('./routes/Architecture')
const ProcessTrack = require('./routes/ProcessTrack')
const userRoute = require('./routes/user')
// 引入邮件发送功能
// const sendMail = require('./public/javascripts/nodemailer')

// sendMail()

const app = express();

// 解决跨域问题
app.use(cors())

// 设置ejs模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(login)
app.use(ISP_Charge)
app.use(processjs)
app.use(EquipmentUsed)
app.use(Architecture)
app.use(ProcessTrack)
app.use(userRoute)


module.exports = app;
