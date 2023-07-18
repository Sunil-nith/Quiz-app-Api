const express= require ("express");
const mongoose = require("mongoose");
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 5000;
const userRouter = require("./routes/userRoutes");


app.use(express.json());


app.use("/users", userRouter);

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

