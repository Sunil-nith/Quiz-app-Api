const express = require("express");
const {createQuiz,getQuizs,updateQuiz,deleteQuiz} = require("../controllers/quizController");
const auth = require("../middlewares/auth");
const quizRouter = express.Router();

quizRouter.post("/", auth, createQuiz);
quizRouter.get("/", auth, getQuizs);
quizRouter.put("/:quizId",auth,updateQuiz);
quizRouter.delete("/:quizId", auth, deleteQuiz);

module.exports = quizRouter;