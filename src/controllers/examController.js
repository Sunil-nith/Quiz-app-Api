const quizModel = require("../models/quiz");
const reportModel =require("../models/report");



const startExam = async (req, res) =>{
    try {
        const quizId = req.params.quizId;
        const quiz = await quizModel.findById(quizId,{
            name:1,
            questions_list:1,
            is_published:1
        });
        res.status(200).json(quiz);

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }
}


const submitExam = async (req, res) => {
    try {
      const quizId = req.params.quizId;
      
      const attempted_question = req.body.attempted_question;
  
      const quiz = await quizModel.findById(quizId,{
        answers:1,
        userId:1,
        _id:0
      });
      
      const quizCreatedBy = quiz.userId;
      const answers = quiz.answers;
      const userId = req.userId;
      const allQuestions = Object.keys(answers);
      const total = allQuestions.length;
      console.log(userId);
     
     let score = 0;
  
      for (let i = 0; i < total; i++) {
        let question_number = allQuestions[i]
        if (
          !!attempted_question[question_number] &&
          answers[question_number] == attempted_question[question_number]
        ) {
          score = score + 1
        }
      }
  
      const newReport = new reportModel({ userId, quizId,quizCreatedBy, score, total });
      const data = await newReport.save();
      const resp = {
        status: "success",
        message: "Quiz submitted",
        data: { total, score, ReportId: data._id }
      }
      res.status(200).send(resp)
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    
    }
  }

module.exports = {
    startExam,submitExam
}