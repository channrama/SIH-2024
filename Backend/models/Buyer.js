const mongoose = require('mongoose');

const buyerSchema = new mongoose.Schema({
  role:{type:String,default:"buyer"},
  photo: String,
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  aadhar: { type: String, required: true,unique:true },
  password: { type: String, required: true },
  address: String,
  posts: [{
    productCategory: { type: String, enum: ['Crops', 'Dairy', 'Poultry'] },
    product: String,
    minPrice: String,
    datePosted:{
        type:Date,
        default:Date.now,
        },
    agreementType: { type: String, enum: ['Pre-harvest', 'Post-harvest',''] },
  }],
  agreements: [{
    farmerId:String,
    buyerId:String,
    farmerName: String,
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
    farmerName: String,
    productType: String,
    product:String,
    minPrice: String,
    dateAgreed: {
        type:Date,
        default:Date.now,
        },
    agreementType: { type: String, enum: ['Pre-harvest', 'Post-harvest',''] },
  }],
  notifications: [{
    message: String,
    type: { type: String, enum: ['Request', 'Agreement', 'Update'] }, // e.g., Request, Agreement, etc.
    timestamp: { type: Date, default: Date.now },
    status: { type: String, enum: ['Unread', 'Read'], default: 'Unread' }
  }],
  date:{
    type:Date,
    default:Date.now,
    }
});

const Buyer = mongoose.model('Buyer', buyerSchema);
module.exports = Buyer;
