const express = require('express')
const uploadFile = require('../public/javascripts/uploadFile')
const bodyparser = require("body-parser");
const ejs = require('ejs')
const jwt = require('jsonwebtoken')

const process_event = require('../public/javascripts/tools/process_events');
const user = require('../public/javascripts/tools/user')
const fs = require('fs')
const mail = require('../public/javascripts/mail/mail')
const turnClassmail = require('../public/javascripts/mail/turnClassMail')

// 创建二级路由
const processjs = express.Router()

// 引入解析请求体数据工具
processjs.use(express.json())
processjs.use(bodyparser.urlencoded({ extended: false }))

// 引入全局路由中间件
// text.use(uploadFile('./File'))

// 获取根目录
const pathname = process.cwd()
// 文件上传路由
processjs.post(('/text'), uploadFile(pathname + '/public/processFile'), (request, response) => { })

processjs.post(('/Findtext'), (request, response) => {
    const name = request.body.dutyName
    try {
        response.download(pathname + `/public/processFile/${name}.jpg`, (err)=>{
            if (!err) {
                // response.end('OK')
            }
        })
    } catch (error) {
        if (error) {
            response.status(404)
            response.end('no such file or directory')
        }
    }
})

processjs.get('/event', (request, response) => {
    process_event.find({}, { del_ID: 0 }).sort({ _id: -1 }).skip().exec((err, data) => {
        if (err) throw err
        response.send(data)
    })
})

// 更新異常事件
processjs.post(('/update_Event'), (request, response) => {
    const newDate = request.body
    newDate.forEach(element => {
        process_event.updateOne({ _id: element._id }, { $set: { ...element } }, (err) => {
            if (!err) {
                response.end('OK')
            }
        })
    });
})
// 新增异常事件
processjs.post('/newEvent', (request, response) => {
    const pre_event = request.body
    try {
        user.findOne({ name: pre_event.people }).exec((err, userinfo) => {
            if (err) throw err
            pre_event.userEmail = userinfo.email
            process_event.create({ ...pre_event }).then(
                value => {
                    ejs.renderFile(`${pathname}/views/newProcessmail.ejs`, { item: pre_event }, (err, html) => {
                        if (err) throw err
                        mail(pre_event, html)
                    })
                    response.end('OK')
                }
            )
        })
    } catch (error) {
        if (error) throw error
    }
})

processjs.post('/user', (request, response) => {
    const token = request.body
    // console.log(token);
    user.find({}).exec((err, data) => {
        if (err) throw err
        data.forEach((item) => {
            try {
                jwt.verify(token.token, jwtSecret, { algorithm: 'HS256', expiresIn: 30000 }, (err, decoded) => {
                    if (err) throw err
                    response.send(decoded.name)
                })
            } catch (err) {
                // console.log(err)
            }
        })
    })
})
processjs.post('/NewTurnClass', (request, response) => {
    const effectInfo = request.body
    console.log(effectInfo.effects);
    ejs.renderFile(`${pathname}/views/turnClassEmail.ejs`, { item: effectInfo.effects }, (err, html) => {
        if (err) throw err
        // mail(pre_event, html)
    })
})

module.exports = processjs