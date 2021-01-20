const express = require("express");
const router = express.Router();

const User = require("../models/user");

//get all users
router.get("/", async (req, res) => {
  try {
    const data = await User.find();
    res.json(data);
  } catch (error) {
    res.json(error);
  }
});

//get specific user by obbject Id
router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.json(user);
  } catch (error) {
    res.json(error);
  }
});

// create user
router.post("/", async (req, res) => {
  const user = new User({
    username: req.body.username,
    imageURL: req.body.imageURL,
  });

  try {
    const result = await user.save();
    res.json(result);
  } catch (error) {
    res.error(error);
  }
});

//update user
router.put("/:userId", async (req, res) => {
  try {
    const updatedUser = await User.updateOne(
      { _id: req.params.userId },
      { $set: { username: req.body.username } }
    );
    res.json(updatedUser);
  } catch (error) {
    res.json(error);
  }
});

//delete user
router.delete("/:userId", async (req, res) => {
  try {
    const removedUser = await User.remove({ _id: req.params.userId });
    res.json(removedUser);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
