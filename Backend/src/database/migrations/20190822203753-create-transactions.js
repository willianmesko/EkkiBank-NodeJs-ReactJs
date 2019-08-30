'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('transactions', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {model: 'users', key: 'id' },
        allowNull: false,
      },
      contact_id: {
        type: Sequelize.INTEGER,
        references: {model: 'contacts', key: 'id' },
        allowNull: true,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      contact_name:{
        type: Sequelize.STRING,
        allowNull:false,
        },
      value: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      canceled_at:{
        type: Sequelize.BOOLEAN,
        defaultValue:0
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

  }
};
