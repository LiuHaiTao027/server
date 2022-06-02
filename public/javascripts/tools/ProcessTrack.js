
const { schema, mongoose } = require('./mongo_con')


const ProcessTrackschema = new schema({
    year:Number,
    recorder:String,
    factory:String,
    ITSR:String,
    PR_Date:String,
    SR:String,
    PR:String,
    PO:String,
    amount:String,
    charge_sector:String,
    vender:String,
    category:String,
    Requirement:String,
    RT:String,
    invoice:String,
    invoice_Delivery_date:Date,
    nvoice_procurement:Date,
    note:String,
    construction_state:String,
    acceptance_phase:String,
    OA:Number,
    I4:Number,
    stipple:Number,
    TEL:Number,
    SFCS:Number,
    PT200:Number,
    Test:Number,
    UTP:Number,
    G_1:Number,
    G_10:Number,
});

const ProcessTrack = mongoose.model('ProcessTrack', ProcessTrackschema)

module.exports = ProcessTrack



