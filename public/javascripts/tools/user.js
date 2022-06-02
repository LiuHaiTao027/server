
const {schema, mongoose} = require('./mongo_con')
const user_schema = new schema({
    name:String,
    workNumber:String,
    email:String,
    password:String,
    permission:String,
    identity:String,
    jwtSecret:String
})

const user = mongoose.model('user', user_schema)

module.exports = user

