const {Users, Likes, Dislikes} = require('../models');

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
    Like: Like,
    Dislike: Dislike,
}