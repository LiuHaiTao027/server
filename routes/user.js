const express = require('express')

const bodyparser = require('body-parser')
const user = require('../public/javascripts/tools/user')
const userRoute = express.Router()


userRoute.use(express.json())

userRoute.use(bodyparser.urlencoded({ extended: false }))

userRoute.post('/users', (request, response)=>{
    user.find({}).exec((err, docs)=>{
        if(err) throw err
        const users = [];
        docs.forEach(element => {
            users.push(element.name)
        });
        response.send(users)
    })
})


userRoute.post('/usersInfo', (request, response)=>{
    user.find({identity:'general'},{ password: 0, jwtSecret: 0 }).exec((err, docs)=>{
        if(err) throw err
        response.send(docs)
    })
})


userRoute.post('/username', (request, response)=>{
    user.find({identity:'general'},{ name: 1, email: 1}).exec((err, docs)=>{
        if(err) throw err
        response.send(docs)
    })
})

module.exports = userRoute