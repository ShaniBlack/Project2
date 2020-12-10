module.exports = function(sequelize, DataTypes) {
    var Journal = sequelize.define("Journal", {
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
      }
    });
  
    Journal.associate = function(models) {
      // We're saying that a Journal should belong to an Traveler
      // A Journal can't be created without an Traveler due to the foreign key constraint
      Journal.belongsTo(models.Location, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return Journal;
  };