const express = require("express");
const cors = require("cors");
require("dotenv").config()
const {connection} = require("./db");
const app = express();
const {userRouter} = require("./routes/user.routes")
const {authentication} = require("./middleware/authentication");
const { kanbanRouter } = require("./routes/kanban.routes");
app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.send("Welcome To The Home Page My Dear");
})

app.use("/",userRouter)
// app.use(authentication);
app.use("/",kanbanRouter)


app.listen(process.env.PORT,async()=>{
   console.log(`The app should be runing in ${process.env.PORT}`);
   try{
    await connection;
    console.log("DB is connected");
   }
   catch(err){
    console.log(err.message)
   }

})