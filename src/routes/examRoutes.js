const express = require("express");
const { startExam,submitExam } = require("../controllers/examController");
const examRouter = express.Router();
const auth = require("../middlewares/auth");

examRouter.get("/:quizId",auth, startExam);
examRouter.post("/:quizId",auth,submitExam);

module.exports = examRouter;