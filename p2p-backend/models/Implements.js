import { Schema, model as _model } from 'mongoose';

const implementSchema = new Schema({
  model: String,
  year: Number,
  images: [String],
  dealer: { type: Schema.Types.ObjectId, ref: 'Dealer' }, //same as brand
  implementType: String,
  implementCategory: String,
  implementPower: Number,
  modelTyneFix: [String],
  modelTyneThickness: Number,
  numberofTyne: Number,
  frameTyne: String,
  interTyneSpacing: Number,
  gapBetweenFrontTyne: Number,
  rearTyne: Number,
  tyneHeight: Number,
  mostHeightGround: Number,
  height: Number,
  width: Number,
  length: Number,
  totalWeigth: Number,
  viewCount: { type: Number, default: 0 },
  widthOfCut: Number,
  powerRequired: Number,
  isApproved: { type: Boolean, default: false },
});

export default _model('Implements', implementSchema);


//Dealer and technicians