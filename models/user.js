'use strict';
let bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    firstName: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1, 255],
          msg: 'nah ah ah you didnt put in a name'
        }
      }
    },
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Please give a valid email address'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [4, 255],
          msg: 'you need a password bruh'
        }
      }
    },
    bio: DataTypes.TEXT,
    birthdate: DataTypes.DATE,
    displayName: DataTypes.STRING,
    admin: DataTypes.BOOLEAN,
    pic: DataTypes.STRING,
    zipcode: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate: pendingUser => {
        //Hash the password. the 12 is the Salt rounds, it defaults to 10
        let hashedPassword = bcrypt.hashSync(pendingUser.password, 12)
        //Reassign the hashed password(overwrite the plain text password)
        pendingUser.password = hashedPassword
      }
    }
  });
  user.associate = function(models) {
    // associations can be defined here
  };

    user.prototype.validPassword = function(typedInPassword) {
        //Determine if the password typed in hashes to the same thing as the existing hash
        let correctPassword = bcrypt.compareSync(typedInPassword, this.password)
        //return the boolean result of the comparison true or false
        console.log('prototype: password was', correctPassword)
        return correctPassword
    }


  return user;
};