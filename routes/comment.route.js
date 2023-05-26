const Router = require("express").Router();
const User = require("../models/user.model");
const { Post, Comment } = require("../models/post.model");

// create comment by user
Router.post("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(400).json({ message: "Post does not exist" });
    }
    const newComment = new Comment({
      comment_text: req.body.comment_text,
      user: req.userId,
    });
    const commentjson = await newComment.save();
    post.comments.push(commentjson._id);
    await post.save();
    res.status(201).json({
      message: "Comment created successfully",
      data: commentjson,
      status: "success",
    });
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
});

module.exports = Router;
