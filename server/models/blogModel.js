const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
     // required: true,
    },
    view: {
      type: Number,
      required : true
    },
    tags_id:{
      type: mongoose.Schema.Types.ObjectId,
      ref:'Tag',
      required : true
    }
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
