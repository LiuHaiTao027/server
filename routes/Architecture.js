const express = require('express')
const Architecture = express.Router()
const bodyparser = require('body-parser')
const fs = require('fs')

// 引入解析请求体数据工具
Architecture.use(express.json())
Architecture.use(bodyparser.urlencoded({extended:false}))

// 获取根目录
const pathname = process.cwd()

Architecture.post('/SFCS', (request, response)=>{
    response.send(fs.readFileSync(`${pathname}/public/File/WCD SFCS Topology20210803.pptx`))
    // public\File\WCD SFCS Topology20210803.pptx
})

module.exports = Architecture