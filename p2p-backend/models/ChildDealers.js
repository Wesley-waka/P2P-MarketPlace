import { Schema, model } from 'mongoose';

const childDealerSchema = new Schema({
  name: String,
  number: String,
  dealer: { type: Schema.Types.ObjectId, ref: 'Dealer' },
  location: {
    type: { type: String, default: 'Point' },
    coordinates: [Number],
  },
});

export default model('Dealer', childDealerSchema);