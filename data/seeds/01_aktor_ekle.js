/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('aktor').del()
  await knex('aktor').insert([
    { id: 1, isim: 'Kemal Sunal' },
    { id: 2, isim: 'Adile Nasit' },
    { id: 3, isim: 'Tarık Akan' }
  ]);
};
