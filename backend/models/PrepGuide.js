const mongoose = require('mongoose');

const prepGuideSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['company', 'role'],
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    difficulty: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      default: 'Intermediate',
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    bookmarksCount: {
      type: Number,
      default: 0,
    },
    content: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
      /*
        If type === 'company':
        {
          processOverview: String,
          commonQuestions: [{ question: String, answer: String }],
          codingTopics: [String],
          behavioralQuestions: [String],
          tips: String
        }
        
        If type === 'role':
        {
          requiredSkills: [String],
          faqs: [{ question: String, answer: String }],
          roadmap: String
        }
      */
    },
  },
  { timestamps: true }
);

const PrepGuide = mongoose.model('PrepGuide', prepGuideSchema);

module.exports = PrepGuide;
