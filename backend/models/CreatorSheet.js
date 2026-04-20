const mongoose = require('mongoose');

const SheetProblemSchema = new mongoose.Schema({
  topic: { type: String, required: true },
  name: { type: String, required: true },
  link: { type: String, required: true },
  difficulty: { type: String }
});

const CreatorSheetSchema = new mongoose.Schema({
  creatorId: { type: String, required: true, unique: true },
  name: { type: String },
  fileData: { type: String },
  fileName: { type: String },
  fileType: { type: String },
  problems: [SheetProblemSchema]
}, { timestamps: true });

module.exports = mongoose.models.CreatorSheet || mongoose.model('CreatorSheet', CreatorSheetSchema);
