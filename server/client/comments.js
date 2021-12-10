const {Users, Comments} = require('../models');

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

module.exports = {
    Comment: Comment,
    GetComment: GetComment,
    DeleteComment: DeleteComment,

};