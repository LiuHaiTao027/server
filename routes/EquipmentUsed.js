const express = require('express')
const bodyparser = require("body-parser");
const Equipment_info = require('../public/javascripts/tools/EquipmentUsed')
const EquipmentUsed = express.Router()

// 引入解析请求体数据工具
EquipmentUsed.use(express.json())
EquipmentUsed.use(bodyparser.urlencoded({ extended: false }))

// 获取根目录
// const pathname = process.cwd()

// 查找所有设备
EquipmentUsed.post('/getEquipmentUsed', (request, response) => {
    Equipment_info.find({}).sort({ _id: -1 }).exec((err, docs) => {
        if (!err) {
            response.send(docs)
        }
    })
})
// 更新设备信息
EquipmentUsed.post(('/update_EquipmentUsed'), (request, response) => {
    const newDate = request.body
    newDate.forEach(element => {
        Equipment_info.updateOne({ _id: element._id }, { $set: { ...element } }, (err) => {
            if (!err) {
                response.end('OK')
            }
        })
    });
})
// 新增设备使用记录
EquipmentUsed.post(('/NewEquipmentUsed'), (request, response) => {
    const EquipmentUsedInfo = request.body
    try {
        Equipment_info.create({ ...EquipmentUsedInfo }).then(
            value => {
                response.send('OK')
            }
        )
    } catch (error) {
        if (error) throw error
    }
})
// 设备查询
EquipmentUsed.post('/selectData', (request, response) => {
    const reasult = request.body
    console.log(reasult);
    if (reasult.tag === 'property') {
        Equipment_info.find({ property_number: reasult.key }).sort({ _id: -1 }).exec((err, docs) => {
            if (!err) {
                response.send(docs)
            }
        })
    } else if (reasult.tag === 'IP') {
        Equipment_info.find({ IP: reasult.key }).sort({ _id: -1 }).exec((err, docs) => {
            if (!err) {
                response.send(docs)
            }
        })
    }

})
module.exports = EquipmentUsed