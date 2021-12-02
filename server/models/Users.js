module.exports = ( sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {

        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Users.associate = models => {
        Users.hasMany(models.Posts, {
            onDelete: "cascade",
            foreignKey: 'user_id'
        });
        Users.hasMany(models.Comments, {
            onDelete: "cascade",
            foreignKey: 'user_id'
        });
        Users.hasMany(models.Likes, {
            onDelete: "cascade",
            foreignKey: 'user_id'
        });
        Users.hasMany(models.Dislikes, {
            onDelete: "cascade",
            foreignKey: 'user_id'
        });
    }
    return Users;
};