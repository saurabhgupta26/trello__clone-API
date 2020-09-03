var express = require("express");
var router = express.Router();
var auth = require("../middlewares/auth");
var User = require("../models/user");
var slug = require("slug");
var Board = require("../models/board");

// create new board

router.post("/board", auth.verifyToken, async function (req, res, next) {
  try {
    req.body.board.user = req.board.userId;
    var createBoard = await Board.create(req.body.board);
    console.log(createBoard, "in the createBoard");
    req.body.board.visibility = req.board.visibility;
    var createBoard = await Board.findById(createBoard.id).populated("user");
    res.status(200).json({
      title: createBoard.title,
      user: createBoard.board.username,
      visibility: createBoard.board.visibility,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/board/team", auth.verifyToken, async function (req, res, next) {
  try {
    // req.body.board.team = req.user.
  } catch (error) {
    next(error);
  }
});

module.exports = router;
