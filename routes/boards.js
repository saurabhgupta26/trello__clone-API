var express = require("express");
var router = express.Router();
var auth = require("../middlewares/auth");
var User = require("../models/user");
var slug = require("slug");
var Board = require("../models/board");

// create new board

router.post("/board", auth.verifyToken, async function (req, res, next) {
  try {
    req.body.board.user = req.user.userId;
    req.body.board.slug = slug(req.body.board.title);
    var createBoard = await Board.create(req.body.board);
    console.log(createBoard, "in the createBoard");
    var createBoard = await Board.findById(createBoard.id).populated("user");
    res.status(200).json({
      slug: createBoard.slug,
      title: createBoard.title,
      user: createBoard.user.username,
    });
  } catch (error) {
    next(error);
  }
});
