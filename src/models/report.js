const mongoose = require("mongoose");

const reportSchema = mongoose.Schema({

    userId: {
        type: mongoose.Types.ObjectId,
        // required: true,
        
      },
     
      quizId: {
        type: mongoose.Types.ObjectId,
        required: true,
        
      },
      score: {
        type: Number,
        required: true,
      },
      total: {
        type: Number,
        required: true,
      },
    },
    { timestamps: true });

module.exports = mongoose.model("Report", reportSchema);