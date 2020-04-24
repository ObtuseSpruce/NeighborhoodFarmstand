'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        defaultValue: false
      },
      bio: {
        type: Sequelize.TEXT
      },
      birthdate: {
        type: Sequelize.DATE
      },
      displayName: {
        type: Sequelize.STRING
      },
      admin: {
        type: Sequelize.BOOLEAN
      },
      pic: {
        type: Sequelize.STRING,
        defaultValue: 'http://placekitten.com/200/200'
      },
      zipcode: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};