module.exports = function(sequelize, DataTypes) {
    var Location = sequelize.define("Location", {
      // Giving the Location model a name of type STRING
      country: 
      {type: DataTypes.TEXT,
        allowNull: false,
        len: [1]
        },
      city: {
        type: DataTypes.TEXT,
        allowNull: false,
        len: [1]
        },
     ratings: {
        type: DataTypes.INTEGER,
        allowNull: false,
        len: [1]
          }
      }
    );
  
    // Location.associate = function(models) {
    //   // Associating Location with Posts
    //   // When an Location is deleted, also delete any associated Posts
    //   Location.hasMany(models.Post, {
    //     onDelete: "cascade"
    //   });
    // };
  
    return Location;
  };