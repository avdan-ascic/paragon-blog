import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: "Title is required!",
    maxLength: [100, "Title must not exceed more than 100 characters!"],
    match: [
      /^[0-9A-Za-z\s]+$/,
      "Title accepts only letters, numbers and spaces!",
    ],
  },
  categories: {
    type: String,
    trim: true,
    required: "Title is required!",
    maxLength: [100, "Categories must not exceed more than 100 characters!"],
    match: [
      /^[0-9A-Za-z\s,]+$/,
      "Categories accepts only letters, numbers, spaces and commas!",
    ],
  },
  description: {
    type: String,
    required: "Description is required!",
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  comment: [
    {
      commentBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
      text: {
        type: String,
        required: "Comment is required!",
      },
    },
  ],
});

export default mongoose.model("post", postSchema);
