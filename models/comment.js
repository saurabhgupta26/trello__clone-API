var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var commentSchema = new Schema(
  {
    body: String,
    author: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    todoCard: {
      type: Schema.Types.ObjectId,
      ref: "TodoList",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("TodoList", todoList);
