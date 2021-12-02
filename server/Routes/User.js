const express = require ("express");
const router = express.Router();
const apiController = require("../controllers/apiController");




// creating endpoint for the API
router.use("/login", apiController.Login);

router.post("/register", apiController.Register);
router.post("/post", apiController.Post);
router.post("/comment/:postid", apiController.Comment);
router.post("/likes", apiController.Like);
router.post("/dislikes", apiController.Dislike);

router.delete("/comment/:commentid", apiController.DeleteComment);
router.delete("/post/:postid", apiController.DeletePost);

router.get("/users", apiController.GetUsers);
router.get("/posts", apiController.GetPost);
router.get("/post/:postid", apiController.GetPostById);
router.get("/comments/:postid", apiController.GetComment);

module.exports = router;