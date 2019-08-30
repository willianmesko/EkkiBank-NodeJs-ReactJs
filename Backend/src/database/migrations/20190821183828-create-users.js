'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cpf: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      password_hash: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      cellphone: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      account_number: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      balance: {
        type: Sequelize.FLOAT,
        defaultValue: 1000,
        allowNull:false,
      },
       limit: {
        type: Sequelize.FLOAT,
        defaultValue: 500,
        allowNull:false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
    })

  },

  down: (queryInterface, Sequelize) => {

  },

  generateCountNumber() {
    return 8*5;
  }
};
