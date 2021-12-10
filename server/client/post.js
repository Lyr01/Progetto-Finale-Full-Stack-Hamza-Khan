const {Users, Posts, Likes, Dislikes} = require('../models');

const Post = async (req, res) => {
    try{
        const {text} = req.body;
        const user_id = req.user.id;

        await Posts.create({post: text, user_id: user_id});  
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

const DeletePost = async (req, res) => {
    const postid = req.params.postid;

    Posts.destroy({
        where: {
            id: postid
        }
    })
}

module.exports = {
    Post: Post,
    GetPost: GetPost,
    GetPostById: GetPostById,
    DeletePost: DeletePost,
};