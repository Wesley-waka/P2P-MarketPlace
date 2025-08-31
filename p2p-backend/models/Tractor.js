import { Schema, model as _model } from 'mongoose';

const tractorSchema = new Schema({
  tractorName: { type: String, required: true },
  model: String,
  year: Number,
  images: { type: [String], required: true },
  // dealer: { type: Schema.Types.ObjectId, ref: 'Dealer', required: true }, //same as brand or make
  isApproved: { type: Boolean, default: false },
  HPCategory: Number,
  cost: Number,
  dealer: { type: String, enum: ['CFAO Motors', 'CMC Motors', 'Mascor', 'FMD'] },
  location: { type: String, enum: ['Nairobi', 'Eldoret', 'Nakuru', 'Nanyuki'] },
  tractorType: { type: String, enum: ['Utility Tractors', 'Row-Crop Tractors', 'Compact Tractors', 'Sub-Compact Tractors', 'High-Horsepower Tractors'], required: true },
  engineHoursUsed: Number,
  vehicleID: Number,
  engineCapacity: Number,
  fuelType: String,
  engineConditions: String,
  engineConsumption: Number,
  tyreConditions: String,
  viewCount: { type: Number, default: 0 },
  exteriorFeatures: { type: [String] },
  interiorFeatures: { type: [String] },
  price: Number,
  createdByUser: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

export default _model('Tractor', tractorSchema);