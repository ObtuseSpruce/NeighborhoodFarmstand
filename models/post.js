'use strict';
module.exports = (sequelize, DataTypes) => {
  const post = sequelize.define('post', {
    offer: DataTypes.STRING,
    trade: DataTypes.STRING,
    postContent: DataTypes.STRING,
    zip: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  post.associate = function(models) {
    // associations can be defined here
    models.post.belongsTo(models.user)
  };
  return post;
};