const express= require ("express");
const mongoose = require("mongoose");
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 5000;
const userRouter = require("./routes/userRoutes");
const quizRouter = require("./routes/quizRoutes");
const examRouter = require("./routes/examRoutes");
const resultRouter = require("./routes/resultRoutes");
app.use(express.json());

app.use("/users", userRouter);
app.use("/quiz", quizRouter);
app.use("/exam",examRouter);
app.use("/result",resultRouter);

app.get("/",(req,res)=>{
    res.send("Quiz-App Api");
});

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("Database Connection Successfull.");
    })
.catch((error)=>{
    console.log(error);
})

app.listen(PORT, () => {
    console.log("Server is running at port no." + PORT);
  });

