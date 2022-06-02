const {schema, mongoose} = require('./mongo_con')

const EquipmentUsed = new schema({
    date:String,
    IP: String,
    original_location: String,
    Use_location: String,
    recorder: String,
    property_number: String,
    serial_number: String,
    model: String,
    // isRoll: String,
    isRoll_out: String,
    editors: String,
    note: String,
})

const Equipment_info = mongoose.model('Equipment_info', EquipmentUsed)

module.exports = Equipment_info