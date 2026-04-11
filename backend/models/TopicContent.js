const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
  l: String,
  u: String,
  t: String
}, { _id: false });

const problemSchema = new mongoose.Schema({
  name: String,
  links: [linkSchema],
  tags: [String]
}, { _id: false });

const topicGroupSchema = new mongoose.Schema({
  label: String,
  problems: [problemSchema]
}, { _id: false });

const monthSchema = new mongoose.Schema({
  month: String,
  theme: String,
  topics: [topicGroupSchema]
}, { _id: false });

const topicContentSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
    unique: true,
    enum: ['dsa', 'dbms', 'os', 'oops', 'system-design'],
  },
  content: [monthSchema]
}, { timestamps: true });

const TopicContent = mongoose.model('TopicContent', topicContentSchema);

module.exports = TopicContent;
