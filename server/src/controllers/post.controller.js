import Post from "../models/post.model";
import User from "../models/user.model";

const create = async (req, res, next) => {
  try {
    let post = new Post(req.body);
    const savedPost = await post.save();
    const populatedPost = await Post.populate(savedPost, [
      { path: "postedBy", select: "-password" },
      { path: "comment.commentBy", select: "-password" },
    ]);
    res.status(200).json(populatedPost);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

const readAll = async (req, res, next) => {
  try {
    const posts = await Post.find({})
      .populate({ path: "postedBy", select: "-password" })
      .populate({ path: "comment.commentBy", select: "-password" })
      .sort("-date");
    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

const readById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate({ path: "postedBy", select: "-password" })
      .populate({ path: "comment.commentBy", select: "-password" });
    res.status(200).json(post);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

const search = async (req, res) => {
  try {
    const regex = new RegExp(req.body.search, "i");
    const posts = await Post.find({
      $or: [
        { title: { $regex: regex } },
        { categories: { $regex: regex } },
        {
          postedBy: {
            $in: await User.find({
              $or: [
                { firstName: { $regex: regex } },
                { lastName: { $regex: regex } },
              ],
            }).select("-password"),
          },
        },
      ],
    })
      .populate("postedBy", "-password")
      .populate("comment.commentBy", "-password")
      .sort("-date");
    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

const update = async (req, res, next) => {
  try {
    const savedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    const populatedPost = await Post.populate(savedPost, [
      { path: "postedBy", select: "-password" },
      { path: "comment.commentBy", select: "-password" },
    ]);
    res.status(200).json(populatedPost);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

const comment = async (req, res, next) => {
  try {
    const savedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { $push: { comment: req.body } },
      { new: true }
    );
    const populatedPost = await Post.populate(savedPost, [
      { path: "comment.commentBy", select: "-password" },
      { path: "postedBy", select: "-password" },
    ]);
    res.status(200).json(populatedPost);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

const remove = async (req, res, next) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Post deleted successfully." });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

export default { create, readAll, readById, search, update, comment, remove };
