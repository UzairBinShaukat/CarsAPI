"use strict";

const Car = use("App/Models/Car");
const Event = use("Event");

class CarController {
  async index({ response }) {
    const cars = await Car.all();

    return cars
      ? response.status(200).json({ message: "Found these cars.", data: cars })
      : response.status(404).json({ message: "Not found any car", data: {} });
  }

  async store({ request, response }) {
    const info = request.post();

    const notification = {
      title: "New Cars Added",
      text: "We've added new cars. Tap to checkout the latest models.",
    };

    const car = new Car();
    car.modelName = info.modelName;
    car.company = info.company;
    car.price = info.price;
    car.description = info.description;
    car.user_id = 0;

    try {
      await car.save();
      Event.emit("notification::created", notification);
    } catch (e) {
      return response.json(e);
    }

    return response
      .status(201)
      .json({ message: "Data inserted succesfully", data: { inserted: true } });
  }

  async show({ params, response }) {
    const car = await Car.find(params.id);

    return car
      ? response.json({ message: "Found a car", data: car })
      : response.json({ message: "No data found", data: {} });
  }

  async update({ params, request, response }) {
    const car = await Car.find(params.id);
    const notification = {
      title: "Data Updated",
      text: "Update list",
    };
    const info = request.post();
    car.modelName = info.modelName;
    car.company = info.company;
    car.price = info.price;
    car.description = info.description;
    car.user_id = info.user_id;

    try {
      await car.save();
      Event.emit("notification::created", notification);
    } catch (e) {
      return response.json(e);
    }
    return response.json({
      message: "Data updated successfully",
      data: { updated: true },
    });
  }

  async destroy({ params, response }) {
    const car = await Car.find(params.id);
    const notification = {
      title: "Deleted a car",
      text: "to update the list",
    };
    try {
      if (car) await car.delete();
      else
        return response.json({
          message: "Record not found",
          data: { deleted: false },
        });
    } catch (e) {
      return response.json(e);
    }
    Event.emit("notification::created", notification);
    return response.json({
      message: "Record deleted successfully",
      data: { deleted: true },
    });
  }
}

module.exports = CarController;
