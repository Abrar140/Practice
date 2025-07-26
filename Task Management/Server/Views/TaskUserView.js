const mongoose = require("mongoose");

const Task = require("../Models/Task");

// const taskUserView= async()=>{
//     return await mongoose.connection.db.collection('tasks').aggregate([
//         {
//             $lookup:{
//                 from:'users',
//                 localFeild:'user',
//                 foreignFeild:"_id",
//                 as:'userDetials'
//             }
//         },{
//             $unwind:'$userDetails'
//         },
//         {
//             $project:{
//                 title:1,
//                 completed:1,
//                 'userDetails.name':1,
//                 'userDetails.email':1,
//             }

//         }
//     ]).toArray();

// }

const taskUserView = async () => {
  return await Task.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "userDetails",
      },
    },
    { $unwind: "$userDetails" },
    {
      $project: {
        title: 1,
        completed: 1,
        "userDetails.name": 1,
        "userDetails.email": 1,
      },
    },
  ]);
};

module.exports = taskUserView;
