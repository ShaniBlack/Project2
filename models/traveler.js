module.exports = function(sequelize, DataTypes) {
  var Traveler = sequelize.define("Traveler", {
    // Giving the Traveler model a name of type STRING
    name: 
    {type: DataTypes.STRING
      },
    city: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
      },
    fav_destintaion: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
      },
    insta_name:{
        type: DataTypes.TEXT,
        allowNull: false,
        len: [1]
      }}
  );

  Traveler.associate = function(models) {
    // Associating Traveler with Posts
    // When an Traveler is deleted, also delete any associated Posts
    Traveler.hasMany(models.Post, {
      onDelete: "cascade"
    });
  };

  return Traveler;
};
