const mongoose = require('mongoose');

const trackerSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    states: {
      type: Map,
      of: String,
      default: {},
    },
    favs: {
      type: Map,
      of: Boolean,
      default: {},
    },
    notes: {
      type: Map,
      of: String,
      default: {},
    },
    globalNote: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

trackerSchema.index({ userId: 1, subject: 1 }, { unique: true });

const Tracker = mongoose.model('Tracker', trackerSchema);
module.exports = Tracker;
