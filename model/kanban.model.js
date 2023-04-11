const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  tasks: [
    {title: {
    type: String,
 
  },
  description: {
    type: String,

  },
  status: {
    type: String,
    enum: ["Todo", "Doing", "Done"],
    default: "Todo",
  },
  subtasks: [
    {title: {
    type: String,

  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
}
],
}
]
},{
  versionKey:false
});


const Board = mongoose.model("Board", boardSchema);

module.exports = { Board };
