import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  google: {
    id: {
      type: String,
      sparse: true
    },
    email: {
      type: String,
      sparse: true,
      lowercase: true
    }
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  favoriteProducts: [{ type: Schema.Types.ObjectId, ref: 'Tractor' }],
  twoFactorCode: {
    type: String,
    default: ''
  },
  phoneNumber: {
    type: String,
    default: ''
  },
  user: {
    type: String,
    required: true,
    enum: ['"admin"', '"seller"', '"buyer"', "buyer", "seller", "admin"],
  },
  isApproved: {
    type: Boolean,
    default: false
  },
  images: {
    type: [String],
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  // location: {
  //   type: {
  //     type: String,
  //     default: 'Point',
  //     required: false
  //   },
  //   coordinates: {
  //     type: [Number],
  //     required: false
  //   }
  // },
  location: {
    type: String
  },
  matchedUsers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
}, {
  timestamps: true
});

// Index for faster queries
userSchema.index({ email: 1 });
userSchema.index({ 'google.id': 1 });

// Pre-save middleware to handle password hashing if needed
userSchema.pre('save', function (next) {
  // You can add password hashing logic here if needed
  next();
});

// Method to validate if the user has completed 2FA
userSchema.methods.has2FACompleted = function () {
  return this.isVerified && !this.twoFactorCode;
};

const User = mongoose.model('User', userSchema);

export default User;