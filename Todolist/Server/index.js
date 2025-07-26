
// const express = require("express");
// const todoRouter = require("./Router/Todoos.js");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const mongoConnection = require("./mongoDB/connection.js");
// const app = express();
// const PORT = 3001;

// app.use(cors());


// app.use("/", todoRouter);

// mongoConnection();
// app.listen(PORT, () => {
//   console.log(`Listening at Port ${PORT}`);
// });







const express = require("express");
const todoRouter = require("./Router/Todoos.js");
const cors = require("cors");
const mongoConnection = require("./mongoDB/connection.js");

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json()); // Built-in middleware to parse JSON bodies

// Routes
app.use("/", todoRouter);

// Database connection
mongoConnection();

// Start the server
app.listen(PORT, () => {
  console.log(`Listening at Port ${PORT}`);
});



























// require("dotenv").config();


// const corsConfig = {
//   credentials: true,
//   origin: true,
// };

// app.use(cookieParser());
// app.use(bodyParser.json({ extended: true, limit: "50mb" }));
// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//     limit: "50mb",
//     parameterLimit: 50000,
//   })
// );


// // const express= require("express")
// // const mongoose= require("mongoose")
// // const cors= require("cors")
// // const TodoModel=require("./Modles/Todo")








// // const app= express()
// // app.use(cors())
// // app.use(express.json())
// // mongoose.connect("mongodb://localhost:27017/Todo")
// // app.get('/get',(req,res)=>{
// //     TodoModel.find()
// //     .then(result=>res.json(result))
// //     .catch(err=>res.json(err))
// // })

// // app.post("/todo",(req,res)=>{
// //     const task = req.body.task;
// //     TodoModel.create({
// //         task:task
// //     }).then(result=>{
// //         res.json(result)
// //     }).catch(err=>req.json(err))
// // })
// // app.listen(3001,()=>{
// //     console.log("server started")
// // })
