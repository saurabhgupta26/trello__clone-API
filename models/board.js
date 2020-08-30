var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var boardSchema = new Schema(
  {
    title: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    background: String,
    teamMembers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: "",
      },
    ],
    visibility: {
      type: Boolean,
      default: false,
    },
    list: [
      {
        type: Schema.Types.ObjectId,
        ref: "List",
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Board", boardSchema);
