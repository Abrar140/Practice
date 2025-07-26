
const taskUserDetailView = async () => {
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
          description: 1,  // Include the new description field
          dueDate: 1,      // Include the new dueDate field
          completed: 1,
          "userDetails.name": 1,
          "userDetails.email": 1,
        },
      },
    ]);
  };
  