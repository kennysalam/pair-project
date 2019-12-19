'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Users',"secret" ),
      queryInterface.removeColumn('Users',"isLogin" )
    ]) 
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Users',"secret", Sequelize.STRING ),
      queryInterface.addColumn('Users',"isLogin", Sequelize.INTEGER )
    ]) 
  }
};
