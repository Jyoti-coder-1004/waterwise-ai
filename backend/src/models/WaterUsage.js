import mongoose from 'mongoose';

const waterUsageSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    amount: {
      type: Number, // In liters
      required: [true, 'Please provide the amount of water used'],
    },
    category: {
      type: String,
      enum: ['Drinking', 'Bathing', 'Washing Clothes', 'Cooking', 'Cleaning', 'Gardening', 'Other'],
      required: [true, 'Please provide a category'],
    },
    date: {
      type: Date,
      default: Date.now,
    },
    notes: {
      type: String,
      maxlength: 500,
    },
    source: {
      type: String,
      enum: ['manual', 'bill_scan', 'smart_meter'],
      default: 'manual',
    },
    aiEstimated: {
      type: Boolean,
      default: false,
    },
    imageUrl: {
      type: String, // For uploaded bills
    }
  },
  {
    timestamps: true,
  }
);

// Add index for fast querying by user and date
waterUsageSchema.index({ user: 1, date: -1 });

const WaterUsage = mongoose.model('WaterUsage', waterUsageSchema);
export default WaterUsage;
