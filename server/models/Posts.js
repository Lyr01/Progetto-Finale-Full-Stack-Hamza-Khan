module.exports = (sequelize, DataTypes) => {
    const Posts = sequelize.define("Posts", {
        post: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    });

    Posts.associate = models => {
        Posts.hasMany(models.Comments, {
            onDelete: "cascade",
            foreignKey: 'post_id'
        });
        Posts.hasMany(models.Likes, {
            onDelete: "cascade",
            foreignKey: 'post_id'
        });
        Posts.hasMany(models.Dislikes, {
            onDelete: "cascade",
            foreignKey: 'post_id'
        });
    } 
    return Posts;
}