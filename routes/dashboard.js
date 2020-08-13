var express = require("express");
var router = express.Router();
var User = require("../models/user");
var auth = require("../middlewares/auth");

router.post("/:profileSlug/setting", auth.verifyToken, async function (
  req,
  res,
  next
) {
  try {
    console.log(req.body.user, "USERID");
    var userId = req.user.userId;
    var user = await User.findByIdAndUpdate(userId, req.body.user);
    console.log(user, "+++++++++++========+++");
    res.status(200).json({
      email: user.email,
      username: user.username,
      token: req.user.token,
      bio: user.bio,
      image: user.image,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
