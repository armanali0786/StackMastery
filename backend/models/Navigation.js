const mongoose = require('mongoose');

const NavigationItemSchema = new mongoose.Schema({
  label: { type: String, required: true },
  href: { type: String },
  children: [this] // Support nested, recursive children
});

const NavigationSchema = new mongoose.Schema({
  version: { type: String, default: "v1" },
  items: [NavigationItemSchema],
}, { timestamps: true });

// Prevent mongoose from failing if model already exists
module.exports = mongoose.models.Navigation || mongoose.model('Navigation', NavigationSchema);
