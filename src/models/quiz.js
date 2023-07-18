const mongoose = require("mongoose");

const quizSchema = mongoose.Schema({

    name : {
        type: String,
        required: true,
        unique: true,
    },
    questions_list: [
        {
          question_number: Number,
          question: String,
          options: {},
        },
      ],
      answers: {},
      userId: {
        type: mongoose.Types.ObjectId,
        required: true,
      },
      is_published: {
        type: Boolean,
        default: false,
      },

}, {timestamps : true});

module.exports = mongoose.model("Quiz", quizSchema);