const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema(
  {
    tags: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Tag = mongoose.model("Tag", tagSchema);

module.exports = Tag;
