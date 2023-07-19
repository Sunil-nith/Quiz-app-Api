const express = require("express");
const {getYourResult,getQuizResult} = require("../controllers/resultController");
const auth = require("../middlewares/auth");
const resultRouter = express.Router();




resultRouter.get("/", auth, getYourResult);
resultRouter.get("/:quizId", auth, getQuizResult);




module.exports = resultRouter;