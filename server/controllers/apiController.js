const {Users, Posts, Comments, Likes, Dislikes} = require('../models');
const bcrypt = require('bcrypt');
const {sign} = require('jsonwebtoken');


const Login = async (req, res) => {
    const { username, password } = req.body;

    const user = await Users.findOne({ where: {username: username}});

    if (!user) res.json({ error: "User doesn't exist"});

    bcrypt.compare(password, user.password).then((match) => {
        if (!match) res.json({ error: "Wrong Username or Password"});

        const accessToken = sign({username: user.username, id: user.id}, 
            "randomsecret"
            );
        res.json(accessToken);
    });
};

const Register = async (req, res) => {
    try{
        const { username, password } = req.body;
        
        const user = await Users.findOne({ where: {username: username}});
        if (user) {
            res.json({ error: "Username alredy in use, choose another!"});
        } else {

            bcrypt.hash(password,10).then((hash) => {
                Users.create({
                username: username,
                password: hash,
            });
        })     
        console.log(req.body);
        res.send();
        }
        
    }
    catch(err){
        console.log(err);
    } 
}

const GetUsers = async (req, res) => {
    try{
        const listOfUsers = await Users.findAll();
        res.json(listOfUsers);
    }catch(err){
        console.log(err);
    }
    
}

const Post = async (req, res) => {
    try{
        const {text, username} = req.body;
        const user = await Users.findOne({ where: {username: username}});

        await Posts.create({post: text, user_id: user.id});  
        res.send();
        
    }
    catch(err){
        console.log(req.body);
    } 
}

const GetPost = async (req, res) => {
    try{
        const listOfPosts = await Posts.findAll({ include: [Likes, Dislikes] });
        res.json(listOfPosts);
    }catch(err){
        console.log(err);
    }
    
}

const GetPostById = async (req, res) => {
    try{
        const postid = req.params.postid;
        const postById = await Posts.findAll({ where: {"id": postid}});
        res.json(postById);
    }catch(err){
        console.log(err);
    }
}

const Comment = async (req, res) => {
    try{
        const {commentBody, username} = req.body;
        const user = await Users.findOne({ where: {username: username}});
        const postid = req.params.postid;
        await Comments.create({commentBody: commentBody, user_id: user.id, post_id: postid});
        res.send();
    } catch(err) {
        console.log(err);
    }
}

const GetComment = async (req, res) => {
    try{
        const getComments = await Comments.findAll();
        res.json(getComments);
    }catch(err){
        console.log(err);
    }
}

const DeleteComment = async (req, res) => {
    const commentid = req.params.commentid;

    Comments.destroy({
        where: {
            id: commentid
        }
    })
}

const DeletePost = async (req, res) => {
    const postid = req.params.postid;

    Posts.destroy({
        where: {
            id: postid
        }
    })
}

const Like = async (req, res) => {
    const {post_id, username} = req.body;
    const user = await Users.findOne({ where: { username: username}});
    const found = await Likes.findOne({ where: {post_id: post_id, user_id: user.id}});
    const foundDislike = await Dislikes.findOne({ where: {post_id: post_id, user_id: user.id}});
    if (!foundDislike) {
        if(found) {
            Likes.destroy({
                where: {
                    post_id: post_id, 
                    user_id: user.id
                }
            })
            res.json({liked: false});
        } else {
            Likes.create({post_id: post_id, user_id: user.id});
            res.json({liked: true});
        }
    }

}

const Dislike = async (req, res) => {
    const {post_id, username} = req.body;
    const user = await Users.findOne({ where: { username: username}});
    const found = await Dislikes.findOne({ where: {post_id: post_id, user_id: user.id}});
    const foundLike = await Likes.findOne({ where: {post_id: post_id, user_id: user.id}});
    if (!foundLike) {
        if(found) {
            Dislikes.destroy({
                where: {
                    post_id: post_id, 
                    user_id: user.id
                }
            })
            res.json({disliked: false});
        } else {
            Dislikes.create({post_id: post_id, user_id: user.id});
            res.json({disliked: true});
        }
    }

}

module.exports = {
    Login: Login,
    Register: Register,
    GetUsers: GetUsers,
    Post: Post,
    GetPost: GetPost,
    GetPostById: GetPostById,
    Comment: Comment,
    GetComment: GetComment,
    DeleteComment: DeleteComment,
    Like: Like,
    Dislike: Dislike,
    DeletePost: DeletePost,
};