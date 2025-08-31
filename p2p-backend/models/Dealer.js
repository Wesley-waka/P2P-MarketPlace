import mongoose, { Schema, model } from 'mongoose';

const dealerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: {
      type: String,
      default: 'Point',
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  number: {
    type: String,
    required: true
  },
  childDealers: [{ type: Schema.Types.ObjectId, ref: 'ChildDealer' }],
  // mechanics: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Dealer'
  // }]
});

const Dealer = mongoose.models.Dealer || mongoose.model('Dealer', dealerSchema);

export default Dealer;