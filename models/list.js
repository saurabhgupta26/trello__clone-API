var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var todoListSchema = new Schema(
  {
    mTitle: String,
    card: [
      {
        type: Schema.Types.ObjectId,
        ref: "todoCard",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("List", todoListSchema);
