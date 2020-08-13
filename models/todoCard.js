var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var todoList = new Schema(
  {
    title: String,
    data: String,
    comment: [
      {
        type: Schema.Types.ObjectId,
        ref: "TodoList",
      },
    ],
    description: String,
    list: {
      type: Schema.Types.ObjectId,
      ref: "List",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("TodoList", todoList);
