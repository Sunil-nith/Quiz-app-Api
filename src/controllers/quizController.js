const quizModel = require("../models/quiz");

const createQuiz = async (req, res) =>{
    
    const {name, questions_list,answers} = req.body;

    const newQuiz = new quizModel({
        name: name,
        questions_list : questions_list,
        answers : answers,
        userId : req.userId
    });

    try {
        
        await newQuiz.save();
        res.status(201).json(newQuiz);

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }
    
}

const getQuizs = async (req, res) =>{
    try {
        
        const quizs = await quizModel.find({userId : req.userId});
        res.status(200).json(quizs);

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }
}

const updateQuiz = async (req, res) =>{
    const quizId = req.params.quizId;
    
    try {const quiz = await quizModel.findById(quizId);
        if (!quiz) {
          return res.status(404).json({ error: 'Quiz not found' });
        }
        if (quiz.userId.toString() !== req.userId) {
          return res.status(403).json({ error: 'You are not authorized to update this Quiz' });
        }
        const {name, questions_list,answers} = req.body;

        const newQuiz = ({
            name: name,
            questions_list : questions_list,
            answers : answers
        });
        await quizModel.findByIdAndUpdate(quizId, newQuiz, {new : true});
        res.status(200).json(newQuiz);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "An error occurred while updating the Quiz"});
        
    }
   

}


const deleteQuiz = async (req, res) =>{

    const quizId = req.params.quizId;

    try {
        const quiz = await quizModel.findById(quizId);
        if (!quiz) {
          return res.status(404).json({ error: 'Quiz not found' });
        }
        if (quiz.userId.toString() !== req.userId) {
          return res.status(403).json({ error: 'You are not authorized to delete this Quiz' });
        }
        await quiz.remove();
        res.json({ message: 'Quiz deleted successfully' });
      } catch (error) {
        res.status(500).json({ error:"Something went wrong"});
    
}
}





module.exports = {createQuiz,getQuizs,updateQuiz,deleteQuiz}
