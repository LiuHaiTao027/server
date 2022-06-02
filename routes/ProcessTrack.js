const express = require('express')
const user = require('../public/javascripts/tools/user')
const ProcessTrack = express.Router()
const bodyparser = require("body-parser");

// 引入数据库原型对象
const ProcessTrackObj = require('../public/javascripts/tools/ProcessTrack')

// 获取根目录
// const pathname = process.cwd()

ProcessTrack.use(express.json())

ProcessTrack.use(bodyparser.urlencoded({ extended: false }))


ProcessTrack.post(('/ProcessTrack'), (request, response) => {
    const {name} = request.body
    user.findOne({name:name}).exec((error, docs)=>{
        if(error) throw error
        if (docs.permission === 'admin') {
            ProcessTrackObj.find().sort({ year: -1 }).exec((err, data) => {
                if (err) throw err
                response.send(data)
            })
        }else{
            ProcessTrackObj.find({recorder:name}).sort({ year: -1 }).exec((err, data) => {
                if (err) throw err
                response.send(data)
            })
        }
    })

})

// ProcessTrack.post(('/updateISP_Charge'), (request, response) => {
//     const newDate = request.body
//     newDate.forEach(element => {
//         ISP_Event.updateOne({ _id: element._id }, { $set: { ...element } }, (err) => {
//             if (!err) {
//                 response.end('OK')
//             }
//         })
//     });
// })

// ProcessTrack.post(('/NewISPCharge'), (request, response) => {
//     const ISPChargeInfo = request.body
//     try {
//         ISP_Event.create({ ...ISPChargeInfo }).then(
//             value => {
//                 response.send('OK')
//             }
//         )
//     } catch (error) {
//         if (error) throw error
//     }
// })

module.exports = ProcessTrack

