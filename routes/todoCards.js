var express = require("express");
var router = express.Router();
var auth = require("../middlewares/auth");
var User = require("../models/user");
var List = require("../models/list");

router.post("/addList", auth.verifyToken, async function (req, res, next) {
    try {
      req.body.board.user = req.board.userId;
      var createList = await List.create(req.body.list);
      console.log(createList, "in the createBoard");
      var createList = await List.findById(createList.id);
      res.status(200).json({
        title: createBoard.title, //check the todo card here
        user: createBoard.board.username,
        visibility: createBoard.board.visibility,
      });
    } catch (error) {
      next(error);
    }
  });




module.exports = router;