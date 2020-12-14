// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
const bcrypt = require('bcryptjs')
    // Creating our Traveler model
module.exports = function(sequelize, DataTypes) {
    const Traveler = sequelize.define('Traveler', {
            // The email cannot be null, and must be a proper email before creation
            name: DataTypes.STRING,
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true
                }
            },
            // The password cannot be null
            password: {
                type: DataTypes.STRING,
                allowNull: false
            }
        })
        // Creating a custom method for our Traveler model. This will check if an unhashed password entered by the traveler can be compared to the hashed password stored in our database
    Traveler.prototype.validPassword = function(password) {
        return bcrypt.compareSync(password, this.password)
    }

    Traveler.associate = function(models) {
        // Associating Traveler with Posts
        // When an Traveler is deleted, also delete any associated Posts
        Traveler.hasMany(models.Post, {
            onDelete: "cascade"
        });
    };
    // Hooks are automatic methods that run during various phases of the Traveler Model lifecycle
    // In this case, before a Traveler is created, we will automatically hash their password
    Traveler.addHook('beforeCreate', traveler => {
        traveler.password = bcrypt.hashSync(
            traveler.password,
            bcrypt.genSaltSync(10),
            null
        )
    })
    return Traveler
}