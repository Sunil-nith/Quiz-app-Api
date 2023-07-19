const reportModel = require("../models/report");



const getYourResult = async (req, res) => {
    try {
        const userId = req.userId;
        const quizResults = await reportModel.find({ userId }, {
            _id: 0,
            quizId: 1,
            score: 1,
            total: 1,
        });

        if (!quizResults || quizResults.length === 0) {
            return res.status(404).json({ message: "You haven't taken any exams" });
        } else {
            res.status(200).json(quizResults);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};


const getQuizResult = async (req, res) => {
    try {
        const quizId = req.params.quizId;
        const quizResults = await reportModel.find({ quizId }, {
            _id: 0,
            quizId: 1,
            quizCreatedBy: 1,
            score: 1,
            total: 1,
        });

        if (!quizResults || quizResults.length === 0) {
            return res.status(404).json({ message: "No quiz results found for the given quizId" });
        }
        if (quizResults[0].quizCreatedBy.toString() !== req.userId) {
            return res.status(403).json({ error: 'You are not authorized to update this Quiz' });
        } else {
            res.status(200).json(quizResults);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};




module.exports = { getYourResult, getQuizResult }