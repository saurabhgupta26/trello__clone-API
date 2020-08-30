var express = require("express");
var router = express.Router();
var User = require("../models/user");
var auth = require("../middlewares/auth");

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

//User Registration
router.post("/", async (req, res, next) => {
  console.log(req.body.user, "user registration");
  try {
    var user = await User.create(req.body.user);
    var token = await auth.generateJWT(user);
    console.log(user, "in user registration", token);
    if (token) {
      user.token = token;
      res.status(200).json({
        email: user.email,
        username: user.username,
        token,
        image: user.image,
        bio: user.bio,
      });
      console.log(token, "token");
    } else {
      res.send("Token not genererated");
    }
  } catch (error) {
    next(error);
  }
});

router.post("/login", async function (req, res, next) {
  var { email, password } = req.body.user;
  if (!email || !password)
    return res.status(400).json({
      success: false,
      error: "Email/Password Required",
    });
  try {
    var user = await User.findOne({ email });
    console.log(user, "++++++_+_+_+_+");
    if (!user)
      return res
        .status(400)
        .json({ success: false, error: "Email/Password Required" });
    if (!user.verifyPassword(password))
      return res
        .status(400)
        .json({ success: false, error: "Email/Password Required" });

    var token = await auth.generateJWT(user);
    console.log(token, "generating token");
    res.status(200).json({
      email: user.email,
      username: user.username,
      token,
      image: user.image,
      bio: user.bio,
      board: user.board,
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:userSlug/setting", async function (req, res, next) {
  try {
    console.log(req.body.user, "USERID");
    var userId = req.user.userId;
    var user = await User.findByIdAndUpdate(userId, req.body.user);
    console.log(user, "hello");
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
