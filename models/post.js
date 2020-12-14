module.exports = function(sequelize, DataTypes) {
    var Post = sequelize.define("Post", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
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
        body: {
            type: DataTypes.TEXT,
            allowNull: false,
            len: [1]
        },
        image: {
            type:
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