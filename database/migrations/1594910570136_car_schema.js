"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class CarSchema extends Schema {
  up() {
    this.create("cars", (table) => {
      table.increments();
      table.string("modelName");
      table.string("company");
      table.string("price");
      table.text("description");
      table.integer("user_id");
      table.foreign("user_id").references("users.id").onDelete("cascade");
      table.timestamps();
    });
  }

  down() {
    this.drop("cars");
  }
}

module.exports = CarSchema;
