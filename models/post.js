module.exports = function(sequelize, DataTypes) {
    var Post = sequelize.define("Post", {
        title: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [1]
            }
        },
        country: {
            type: DataTypes.TEXT,
            allowNull: false,
            len: [1]
        },
        city: {
            type: DataTypes.TEXT,
            allowNull: false,
            len: [1]
        },
        lodging: {
            type: DataTypes.TEXT,
            allowNull: false,
            len: [1]
        },
        ratings: {
            type: DataTypes.INTEGER,
            allowNull: false,
            len: [1]
        },
        activities: {
            type: DataTypes.TEXT,
            allowNull: false,
            len: [1]
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false,
            len: [1]
        },
        imgTitle: {
            type: DataTypes.STRING
        },
        imageURL: {
            type: DataTypes.STRING
        }
    });

    Post.associate = function(models) {
        // We're saying that a Post should belong to an Traveler
        // A Post can't be created without an Traveler due to the foreign key constraint
        Post.belongsTo(models.Traveler, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Post;
};