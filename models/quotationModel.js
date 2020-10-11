const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const QuotationSchema = mongoose.Schema({
    // _id: ObjectId,
    job_id: String,
    workers: Number,
    wage: String,
    price: Number,
    description: String,
    trader_user_id: String
});

const Quotation = mongoose.model('Quotation', QuotationSchema);

module.exports = Quotation;
