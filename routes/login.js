const express = require('express')
const jwt = require('jsonwebtoken')
const { nanoid } = require('nanoid')
const bodyparser = require("body-parser");
const login = express.Router()
const fs = require('fs')

const user = require('../public/javascripts/tools/user')


jwtSecret = nanoid()
// console.log(jwtSecret)
login.use(express.json())
login.use(bodyparser.urlencoded({ extended: false }))

login.post('/newUser', (request, response) => {
    const userinfo = request.body
    // const token = jwt.sign(
    //     { name: userinfo.username },
    //     jwtSecret,
    //     { algorithm: 'HS256', expiresIn: 3000 }
    // )
    try {
        user.create({ ...userinfo}).then(
            value => {
                console.log('插入成功', value)
                response.send('OK')
            }
        )
    } catch (error) {
        if (error) throw error
    }
})


login.post('/login', (request, response) => {

    user.findOneAndUpdate({ workNumber: request.body.workNumber, password: request.body.password }, { $set: { jwtSecret } }, null, (error, result) => {
        if (error) throw response.end('用户不存在')
        // console.log(request.body.workNumber === result.workNumber && request.body.password === result.password);
        try {
            if (request.body.workNumber === result.workNumber && request.body.password === result.password) {
                if (request.body.password === '123456') {
                    response.end('please reset your password')
                } else {
                    const token = jwt.sign(
                        { name: result.name },
                        jwtSecret,
                        { algorithm: 'HS256', expiresIn: 30000 }
                    )
                    // response.set({token})
                    // response.setHeader({token:token})
                    response.end(token)
                }
            }else{
                response.end('账号或者密码不正确')
            }
        } catch (error) {
            console.log(error);
            response.end('账号密码错误')
        }
    })
})

login.post('/admin', (request, response) => {
    user.find({}).exec((error, docs) => {
        if (error) throw error
        docs.forEach((item) => {
            const { jwtSecret } = item
            try {
                jwt.verify(request.body.token, jwtSecret, { algorithm: 'HS256', expiresIn: 30000 }, (err, decoded) => {
                    if (err) throw error
                    if (decoded.name === item.name) {
                        response.send(decoded.name)
                    }
                })
            } catch (err) {
                console.log()
            }
        })
    })
})

module.exports = login