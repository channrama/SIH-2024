const mongoose = require('mongoose');

//schema for bank details
const bankDetailsSchema = new mongoose.Schema({
    bankName:{
      type:String,
    },
    accnum:{
      type:String,
    },
    isfccode:{
      type:String,
    },
    branch:{
      type:String,
    }
  })
const farmerSchema = new mongoose.Schema({
  role:{type:String,default:"farmer"},
  photo: String,
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  aadhar: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: String,
  land: Number,
  productCategory: { type: String, enum: ['Crops', 'Dairy', 'Poultry'] },
  products: [String],
  bankDetails:bankDetailsSchema,
  agreements: [{
    buyerId:String,
    farmerId:String,
    buyerName: String,
    productType: String,
    product:String,
    minPrice: String,
    dateAgreed: {
        type:Date,
        default:Date.now,
        },
    agreementType: { type: String, enum: ['Pre-harvest', 'Post-harvest',''] },
  }],
  agreeRequest:[{
    buyerId:String,
    farmerId:String,
    buyerName: String,
    productType: String,
    product:String,
    minPrice: String,
    dateAgreed: {
        type:Date,
        default:Date.now,
        },
    agreementType: { type: String, enum: ['Pre-harvest', 'Post-harvest',''] },
  }],
  date:{
    type:Date,
    default:Date.now,
    },
    notifications: [{
        message: String,
        type: { type: String, enum: ['Request', 'Agreement', 'Update'] }, // e.g., Request, Agreement, etc.
        timestamp: { type: Date, default: Date.now },
        status: { type: String, enum: ['Unread', 'Read'], default: 'Unread' }
      }],
});

const Farmer = mongoose.model('Farmer', farmerSchema);
module.exports = Farmer;
