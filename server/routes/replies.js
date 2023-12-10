const express = require("express");
const auth = require("../middleware/auth");
const { Reply, validateReply } = require("../models/replies");
const { Post } = require("../models/post");
const router = express.Router();

router.post("/create/:id", auth, async (req, res) => {
  try {
    await Post.findById(req.params.id);
  } catch (ex) {
    return res.status(400).json({ error: "The Post with the given ID doesn't exist!" });
  }

  const { error } = validateReply(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const reply = new Reply({
    post: req.params.id,
    comment: req.body.comment,
    author: req.user._id,
  });

  try {
    await reply.save();
    const reply_populated = await Reply.findById(reply._id).populate("author", "name -_id");
    res.json({ data: reply_populated });
  } catch (ex) {
    console.error("Error creating reply:", ex);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    await Post.findById(req.params.id);
  } catch (ex) {
    return res.status(400).json({ error: "The Post with the given ID doesn't exist!" });
  }

  const replies = await Reply.find({ post: req.params.id }).populate("author", "name username");
  res.json({ data: replies });
});

router.put("/like/:id", auth, async (req, res) => {
  const reply = await Reply.findById(req.params.id);
  if (!reply) return res.status(400).json({ error: "Reply doesn't exist" });
  if (reply.author.equals(req.user._id)) return res.status(400).json({ error: "You can't upvote your own reply" });

  const upvoteArray = reply.upvotes;
  const index = upvoteArray.indexOf(req.user._id);
  
  if (index === -1) {
    upvoteArray.push(req.user._id);
  } else {
    upvoteArray.splice(index, 1);
  }

  reply.upvotes = upvoteArray;
  const result = await reply.save();
  const reply_new = await Reply.findById(reply._id).populate("author", "name username");
  res.json({ data: reply_new });
});

module.exports = router;
