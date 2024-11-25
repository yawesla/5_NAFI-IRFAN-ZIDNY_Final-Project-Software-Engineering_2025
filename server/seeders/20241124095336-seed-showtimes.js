'use strict';

/** @type {import('sequelize-cli').Migration} */
const data = require('../data/showtimes.json')
data.forEach(el => {
  el.createdAt = el.updatedAt = new Date()
  delete el.id
})
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Showtimes', data);
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Showtimes', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
