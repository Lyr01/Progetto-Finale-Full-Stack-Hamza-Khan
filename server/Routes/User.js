const express = require ("express");
const router = express.Router();
const Auth = require("../client/auth");
const Comments = require("../client/comments");
const Post = require("../client/post");
const likeDislike = require("../client/likeDislike");

const { validateToken } = require("../middlewares/AuthMiddleware");

// Endpoint for Auth
router.use("/login", Auth.Login);
router.post("/register", Auth.Register);
router.get("/users", Auth.GetUsers);

// Endpoint for Post
router.post("/post", validateToken, Post.Post);
router.get("/posts", Post.GetPost);
router.delete("/post/:postid", validateToken, Post.DeletePost);
router.get("/post/:postid", Post.GetPostById);

// Endpoint for Comments
router.post("/comment/:postid", validateToken, Comments.Comment);
router.get("/comments/:postid", Comments.GetComment);
router.delete("/comment/:commentid", validateToken, Comments.DeleteComment);

// Endpoint for Like or Dislike
router.post("/likes", validateToken, likeDislike.Like);
router.post("/dislikes", validateToken, likeDislike.Dislike);



module.exports = router;