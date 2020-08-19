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
      data: {
        title: "Testing from backend",
        text: "testing for backend to add a new car",
      },
      to: "1:20614456215:android:4a16e8f5d914d9327d1ad2",
      priority: "high",
    };
    // const notification = await Notification.create({
    //   title: "Testing from backend",
    //   text: "testing for backend to add a new car",
    // });

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
    const info = request.post();
    car.modelName = info.modelName;
    car.company = info.company;
    car.price = info.price;
    car.description = info.description;
    car.user_id = info.user_id;

    try {
      await car.save();
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
    return response.json({
      message: "Record deleted successfully",
      data: { deleted: true },
    });
  }
}

module.exports = CarController;
